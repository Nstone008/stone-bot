const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge')
        .setDescription('Verbally challenge another user!!!'),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.id} challenges other user`);
    }
}