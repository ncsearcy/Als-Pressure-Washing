const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from gallery folder
app.use('/api/images', express.static(path.join(__dirname, 'public/gallery')));

// Gallery API endpoint
app.get('/api/gallery', async (req, res) => {
  try {
    const galleryPath = path.join(__dirname, 'public/gallery');
    
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
          url: `/api/images/${filename}`,
          size: stats.size,
          lastModified: stats.mtime,
          title: path.parse(filename).name.replace(/[-_]/g, ' ')
        };
      })
    );

    // Sort by last modified date (newest first)
    imageData.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    res.json({
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
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { firstName, lastName, email, phone, inquiryType, message, captcha } = req.body;
    
    // Basic validation
    if (!firstName || !lastName || !email || !phone || !inquiryType || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Validate captcha properly
    
    console.log('Contact form submission:', {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      inquiryType,
      message: message.substring(0, 100) + '...'
    });

    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Gallery API available at http://localhost:${PORT}/api/gallery`);
  console.log(`Health check at http://localhost:${PORT}/api/health`);
});

module.exports = app;