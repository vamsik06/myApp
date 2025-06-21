const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Check if API keys are present
if (!process.env.OPENAI_API_KEY) {
  console.error('⚠️ OPENAI_API_KEY is not set in .env file');
}
if (!process.env.DID_API_KEY) {
  console.error('⚠️ DID_API_KEY is not set in .env file');
}

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Proxy for OpenAI
app.post('/api/openai', async (req, res) => {
  try {
    console.log('📡 Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ OpenAI API Error:', data);
      return res.status(response.status).json({
        error: 'OpenAI API Error',
        details: data.error?.message || 'Unknown error',
        code: response.status
      });
    }

    console.log('✅ OpenAI API call successful');
    res.json(data);
  } catch (err) {
    console.error('❌ OpenAI API Error:', err);
    res.status(500).json({
      error: 'Error contacting OpenAI API',
      details: err.message
    });
  }
});

// Proxy for D-ID
app.post('/api/did', async (req, res) => {
  try {
    console.log('📡 Calling D-ID API...');
    const response = await fetch('https://api.d-id.com/talks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.DID_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ D-ID API Error:', data);
      return res.status(response.status).json({
        error: 'D-ID API Error',
        details: data.error?.message || 'Unknown error',
        code: response.status
      });
    }

    console.log('✅ D-ID API call successful');
    res.json(data);
  } catch (err) {
    console.error('❌ D-ID API Error:', err);
    res.status(500).json({
      error: 'Error contacting D-ID API',
      details: err.message
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`
🚀 Proxy server running on port ${PORT}
📍 OpenAI endpoint: http://localhost:${PORT}/api/openai
📍 D-ID endpoint: http://localhost:${PORT}/api/did
📍 Test endpoint: http://localhost:${PORT}/api/test
  `);
}); 