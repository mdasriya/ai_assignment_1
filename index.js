const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors())
app.use(express.json());

app.get('/shayari', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const response = await axios.post('https://interviewaibackend-production.up.railway.app/chatgpt/retrieve-data', {
      prompt: `Shayari about ${keyword} in english and hindi`,
      max_tokens: 100,
      temperature: 0.7,
    //   n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const shayari = response.data;
    res.json({ shayari });
    // console.log(shayari);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
