// services/userService.js

// Import the User model
const User = require('../models/user');

// Retrieve a user by their phone number
async function getUserByPhoneNumber(phoneNumber) {
  return await User.findOne({ phoneNumber });
}

// Create a new user with a given phone number
async function createUser(phoneNumber) {
  const user = new User({ phoneNumber });
  await user.save();
  return user;
}

// Export the functions for use in other parts of the application
module.exports = {
  getUserByPhoneNumber,
  createUser,
};
