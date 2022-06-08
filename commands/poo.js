const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poo')
        .setDescription('This may be stinky!'),
    async execute(interaction) {
        await interaction.reply('Just stinky poo!')
    }
}