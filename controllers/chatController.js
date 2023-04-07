// Import required libraries and packages
const axios = require('axios');
const { sendSMS } = require('../twilioHandler');
const User = require('../models/user'); // Import the User model
const { generateReply } = require('../services/ai'); // Import the generateReply function from the ai.js file


// Helper function to interact with the ChatGPT API
async function chatGPT(userMessage) {
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

// Main function to handle incoming SMS messages
async function handleIncomingMessage(userMessage, userPhoneNumber) {
  // Check if the user exists in the database
  let user = await User.findOne({ phoneNumber: userPhoneNumber });

  // If the user doesn't exist, create a new one
  if (!user) {
    user = new User({ phoneNumber: userPhoneNumber });
    await user.save();
  }

  try {
    const scatterbrainResponse = await generateReply(userMessage);
    return scatterbrainResponse;
  } catch (error) {
    console.error(`Error handling incoming message: ${error.message}`);
    return 'Error processing message.';
  }
}

// Export the handleIncomingMessage function
module.exports = { handleIncomingMessage };
