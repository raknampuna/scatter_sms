const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const generateReply = require('./ai');
const { DISCORD_CLIENT_ID, DISCORD_BOT_TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'chat') {
    const message = interaction.options.getString('message');

    await interaction.deferReply();

    try {
      const response = await generateReply(message);

      const formattedResponse = `**You:** ${message}\n**${client.user.username}:** ${response}`;

      await interaction.editReply(formattedResponse);
    } catch (error) {
      console.error(error);
      await interaction.editReply('An error occurred while processing your request.');
    }
  }
});

const commands = [
  {
    name: 'chat',
    description: 'Send a message to ChatGPT AI',
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

const rest = new REST({ version: '9' }).setToken(DISCORD_BOT_TOKEN);

const registerCommands = async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};

const login = async () => {
  await client.login(DISCORD_BOT_TOKEN);
};

module.exports = {
  client,
  registerCommands,
  login,
};
