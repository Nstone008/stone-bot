const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
        await wait(2000);
        await interaction.followUp('Followed up Pong! Damn you stinky...');
    }
}