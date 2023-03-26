// chatRoutes.js - Handles chat-related routes and imports the chat controller

// Import the 'express' package and create a new router instance
const express = require('express');
const router = express.Router();

// Import the chat controller from the 'controllers' directory
const chatController = require('../controllers/chatController');

// Define a POST route for '/message' that uses the 'handleIncomingMessage' function from the chat controller
router.post('/message', chatController.handleIncomingMessage);

// Export the router for use in the main application file (app.js)
module.exports = router;
