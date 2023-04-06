// Import necessary modules
const { Client, GatewayIntentBits } = require('discord.js');
const chatController = require('./controllers/chatController');

// Load environment variables
require('dotenv').config();

// Initialize a Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

// When the bot is ready, log a message
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// When a message is received
client.on('messageCreate', async (message) => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  // If the bot is mentioned
  if (message.mentions.users.has(client.user.id)) {
    // Call the handleIncomingMessage function with the message content
    const response = await chatController.handleIncomingMessage(message.content, message.author.id);
    // Send the response back to the same channel
    message.channel.send(response);
  }
});

// Log in the bot with the token from the environment variables
client.login(process.env.DISCORD_BOT_TOKEN);
