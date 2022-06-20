const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
.setName('challenge')
.setDescription('Verbally challenge another user!!!')
.addStringOption(option => 
    option.setName('category')
          .setDescription('Rock paper scissors, or whatever you want to call it.')
          .setRequired(true)
          .addChoices(
            { name: 'rock', value: 'rock' },
            { name: 'Meme', value: 'gif_meme' },
            { name: 'Movie', value: 'gif_movie' },
            { name: 'Dad', value: 'dad'})
            );

module.exports = {
    data: data,
    async execute(interaction){
        await interaction.reply('Hi there!');
    }
}