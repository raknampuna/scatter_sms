// Main entry point for the application, sets up the server and imports routes
// This code sets up a basic Express server that listens for incoming requests on a specified port.
// When a GET request is made to the root endpoint (/), the server responds with the message "Welcome to Aissistant!"
// The server is then started, and a message is logged to the console to indicate that it is running and on which port.

// Import the required packages (Express framework and cors middlewear)
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes'); // Import chatRoutes
const rootRoutes = require('./routes/rootRoutes'); // Import rootRoutes
const mongoose = require('mongoose'); // Import Mongoose
const discordBot = require('./discordBot'); // Import the Discord bot

// Replace this with your own MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scatterbrainSMS';

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Create an instance of the Express application
const app = express();

// Set the server port; use the environment variable PORT if provided, otherwise default to 2341
const PORT = process.env.PORT || 2341;

// Apply middleware
app.use(express.json()); // Use the built-in JSON middleware to parse incoming request bodies as JSON objects
app.use(cors()); // Enable CORS

// Use imported routes
app.use('/', rootRoutes); // Use rootRoutes for requests with root path
app.use('/chat', chatRoutes); // Use chatRoutes for requests with '/chat' path

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  // Log a message to the console to indicate the server is running and on which port
  console.log(`Server is running on port ${PORT}`);
});

// Start the Discord bot
// discordBot();
