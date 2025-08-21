const fs = require('fs').promises;
const path = require('path');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In Vercel, use the public directory for static files
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');

    console.log('Looking for gallery at:', galleryPath);
    console.log('Current working directory:', process.cwd());
    console.log('Environment:', process.env.VERCEL ? 'Vercel' : 'Local');

    // Check if gallery directory exists (don't try to create it)
    let files = [];
    try {
      files = await fs.readdir(galleryPath);
      console.log('Found files:', files);
    } catch (error) {
      console.log('Gallery directory not found or empty:', error.message);
      // Return empty gallery instead of error
      return res.status(200).json({
        success: true,
        images: [],
        count: 0,
        message: 'Gallery directory not found. Please upload images to /public/gallery/'
      });
    }
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    console.log('Image files found:', imageFiles);

    // Return image data with metadata
    const imageData = await Promise.all(
      imageFiles.map(async (filename) => {
        try {
          const filePath = path.join(galleryPath, filename);
          const stats = await fs.stat(filePath);
          
          return {
            filename,
            url: `/gallery/${filename}`, // Vercel serves from /public automatically
            size: stats.size,
            lastModified: stats.mtime,
            title: path.parse(filename).name.replace(/[-_]/g, ' ')
          };
        } catch (error) {
          console.error(`Error processing file ${filename}:`, error);
          return null;
        }
      })
    );

    // Filter out null entries (failed files)
    const validImages = imageData.filter(img => img !== null);

    // Sort by last modified date (newest first)
    validImages.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    res.status(200).json({
      success: true,
      images: validImages,
      count: validImages.length
    });

  } catch (error) {
    console.error('Error reading gallery:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load gallery images',
      message: error.message,
      debug: {
        cwd: process.cwd(),
        nodeEnv: process.env.NODE_ENV
      }
    });
  }
}