// Import the Twilio library
const twilio = require('twilio');

// Import important configs
require('dotenv').config();

// Set up Twilio credentials
// Replace these with your own Twilio Account SID, Auth Token, and phone number
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize the Twilio client with your account credentials
const client = new twilio(accountSid, authToken);

// Function to send SMS message
// Takes two parameters: the recipient's phone number (to) and the message text (message)
async function sendSMS(to, message) {
  try {
    // Use the Twilio client to create and send the SMS message
    const result = await client.messages.create({
      body: message, // The content of the SMS message
      from: twilioPhoneNumber, // The Twilio phone number sending the message
      to: to, // The recipient's phone number
    });

    // Log a success message if the SMS was sent successfully
    console.log(`Message sent successfully: ${result.sid}`);
  } catch (error) {
    // Log an error message if there was a problem sending the SMS
    console.error(`Error sending SMS: ${error.message}`);
  }
}

// Example usage of the sendSMS function
// Replace '+1234567890' with the recipient's phone number (in E.164 format)
// sendSMS('+1234567890', 'Hello from Aissistant!');

// Export the sendSMS function so it can be used in other parts of your project
module.exports = { sendSMS };