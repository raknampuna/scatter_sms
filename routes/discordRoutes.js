const { generateReply } = require('../services/ai.js');
const discordService = require('../services/discordService');

const { client } = discordService;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
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
