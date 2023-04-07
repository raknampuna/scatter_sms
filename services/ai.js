// ai.js - A service for interacting with the ChatGPT API

// Import required libraries
const axios = require('axios');
require('dotenv').config();

// Load the OpenAI API key and endpoint
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Function to interact with the ChatGPT API
async function generateReply(userMessage) {
  const prompt = `User: ${userMessage}\nScatterbrain SMS:`;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  const data = {
    'prompt': prompt,
    'max_tokens': 50,
    'temperature': 0.7,
    'n': 1,
  };

  try {
    const response = await axios.post(OPENAI_API_URL, data, { headers: headers });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(`Error interacting with ChatGPT: ${error.message}`);
    return 'An error occurred while processing your message. Please try again later.';
  }
}

// Export the generateReply function
module.exports = { generateReply };
