require('dotenv').config();
const { generateReply } = require('./services/ai.js');
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
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

    // Let Discord know that you intend to reply, but need more time
    await interaction.deferReply();

    // Process the message and generate a response using ChatGPT API
    try {
      const response = await generateReply(message);

      // Format the response to include the user's message
      const formattedResponse = `**You:** ${message}\n**${client.user.username}:** ${response}`;

      // Edit the deferred reply with the formatted response
      await interaction.editReply(formattedResponse);
    } catch (error) {
      console.error(error);
      await interaction.editReply('An error occurred while processing your request.');
    }
  }
});

// Log the bot into Discord
client.login(TOKEN);
