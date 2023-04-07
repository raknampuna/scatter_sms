require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const CLIENT_ID = '1093692560792363136'; // Replace with your bot's client ID
const TOKEN = process.env.DISCORD_BOT_TOKEN;

// Log the start of refreshing application commands
console.log("Started refreshing application (/) commands.");

// Define the commands for your bot
const commands = [
  {
    name: 'chat',
    description: 'Send a message to ChatGPT AI', // Add a description for the chat command
    options: [
      {
        name: 'message',
        type: 3,
        description: 'The message you want to send to ChatGPT AI',
        required: true,
      },
    ],
  },
];

// Create a REST instance to interact with Discord API
const rest = new REST({ version: '10' }).setToken(TOKEN);

// Function to register the commands with the Discord API
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // Register the commands with the Discord API
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

// Event listener for when the bot is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for incoming interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // Handle the 'chat' command
  if (interaction.commandName === 'chat') {
    const message = interaction.options.getString('message');
    // Process the message and generate a response using ChatGPT API here
    const response = 'This is the AI response'; // Replace this with the actual response from ChatGPT API

    // Reply to the interaction with the AI response
    await interaction.reply(response);
  }
});

// Log the bot into Discord
client.login(TOKEN);
