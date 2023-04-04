// chatRoutes.js - Handles chat-related routes and imports the chat controller

// Import the 'express' package and create a new router instance
const express = require('express');
const router = express.Router();
// Import the chat controller from the 'controllers' directory
const chatController = require('../controllers/chatController');

// Route for handling incoming SMS messages from Twilio
// This route will be called by Twilio when the Twilio phone number receives an SMS.
// The chatController's handleIncomingMessage function will process the message and send a response.
router.post('/incoming-sms', chatController.handleIncomingMessage);

// Export the router for use in the main application file (app.js)
module.exports = router;
