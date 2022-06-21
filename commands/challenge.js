const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
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
                { name: 'Dad', value: 'dad'},
                { name: 'Evangelion', value: 'Depression Robot'})
                )
              .addUserOption(option => option.setName('target').setDescription('Select a user')
              ),
    async execute(interaction){
        await interaction.reply('Hi there!');

        // Need to figure out how to find the response
        // a user submits, I currently have the multiple
        // options set up. As well as a target player possible.
    }
}