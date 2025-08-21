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
    const galleryPath = path.join(process.cwd(), 'public/gallery');

    // Create gallery directory if it doesn't exist
    try {
      await fs.access(galleryPath);
    } catch (error) {
      await fs.mkdir(galleryPath, { recursive: true });
      console.log('Created gallery directory');
    }

    // Read directory contents
    const files = await fs.readdir(galleryPath);
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Return image data with metadata
    const imageData = await Promise.all(
      images.map(async (filename) => {
        const filePath = path.join(galleryPath, filename);
        const stats = await fs.stat(filePath);
        
        return {
          filename,
          url: `/gallery/${filename}`, // Vercel serves from /public automatically
          size: stats.size,
          lastModified: stats.mtime,
          title: path.parse(filename).name.replace(/[-_]/g, ' ')
        };
      })
    );

    // Sort by last modified date (newest first)
    imageData.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    res.status(200).json({
      success: true,
      images: imageData,
      count: imageData.length
    });

  } catch (error) {
    console.error('Error reading gallery:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load gallery images',
      message: error.message
    });
  }
}