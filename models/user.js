// Import the Mongoose library

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the schema for user profiles
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Assign a unique ID to each user by default
  },
  phoneNumber: {
    type: String,
    required: true, // Phone number is required for each user
    unique: true, // Phone number must be unique for each user
  },
  preferences: {
    type: Object,
    default: {}, // Default value for preferences is an empty object
  },
  goals: {
    type: Array,
    default: [], // Default value for goals is an empty array
  },
  progress: {
    type: Object,
    default: {}, // Default value for progress is an empty object
  },
});

// Create a Mongoose model for user profiles using the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
