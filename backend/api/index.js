export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.status(200).json({
    message: "Al's Power Washing API is running!",
    status: "OK",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      gallery: '/api/gallery',
      contact: '/api/contact (POST)'
    },
    version: "1.0.0"
  });
}