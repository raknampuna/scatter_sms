// Import the Express package to set up a router for handling HTTP requests
const express = require('express');

// Create a new router instance to define and manage routes
const router = express.Router();

// Define a route for GET requests to the root path ('/')
// When a client sends a GET request to the root path, this function will be executed
router.get('/', (req, res) => {
  // Send a response with the message 'Welcome to Aissistant!'
  res.send('Welcome to ScatterBrain SMS!');
});

// Export the router instance so that it can be imported and used in other parts of the application
module.exports = router;
