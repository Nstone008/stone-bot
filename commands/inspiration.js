const { SlashCommandBuilder } = require('@discordjs/builders');
const { listOfInspiration } = require('../utils/messsages');
const { getRandomArbitrary } = require('../utils/random')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('inspiration')
                .setDescription('Send some inspiration to a user')
                .addUserOption(option => option.setName('user')
                                            .setDescription('Lucky User')
                                            .setRequired(true)),
    async execute(interaction) {
        const userToMessage = await interaction.options.getUser('user');
        const sender = interaction.user;
        const selection = getRandomArbitrary(0,listOfInspiration.length);
        const message = listOfInspiration[selection]

        userToMessage.send(`"${message}" -${sender}`);
        interaction.reply('Inspiration sent');
    }    
}