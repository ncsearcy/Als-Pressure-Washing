export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    res.status(200).json({
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
}