// db.js

// Import required modules and packages
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Load the MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

module.exports = {
  client,
};
