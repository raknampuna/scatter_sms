// Main entry point for the application, sets up the server and imports routes
// This code sets up a basic Express server that listens for incoming requests on a specified port.
// When a GET request is made to the root endpoint (/), the server responds with the message "Welcome to Aissistant!"
// The server is then started, and a message is logged to the console to indicate that it is running and on which port.


// Import the required packages (Express framework and cors middlewear)
const express = require('express');
const cors = require('cors');

// Create an instance of the Express application
const app = express();

// Set the server port; use the environment variable PORT if provided, otherwise default to 2341
const PORT = process.env.PORT || 2341;

// Apply middlewear
app.use(express.json()); // Use the built-in JSON middleware to parse incoming request bodies as JSON objects
app.use(cors()); // Enable CORS

// Define routes
// first define a route handler for GET requests to the root ('/') endpoint
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Welcome to ScatterBrain SMS!');
});

// Additional routes go here

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  // Log a message to the console to indicate the server is running and on which port
  console.log(`Server is running on port ${PORT}`);
});

