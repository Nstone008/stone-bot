const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const { } = require('../game')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('challenge')
    .setDescription('Verbally challenge another user!!!')
    // .addStringOption(options => 
    //     options.setName('category')
    //           .setDescription('Rock paper scissors, or whatever you want to call it.')
    //           .setRequired(true)
    //           .addChoices(
    //             { name: 'rock', value: 'rock' },
    //             { name: 'Meme', value: 'gif_meme' },
    //             { name: 'Movie', value: 'gif_movie' },
    //             { name: 'Dad', value: 'dad'},
    //             { name: 'Evangelion', value: 'Depression Robot'})
    //             )
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
    async execute(interaction){
        
        //const choice = interaction.options.getString('category')
        const target = interaction.options.getUser('target')

        //await interaction.reply(`Challenger picked ${choice}, Your challenge was for ${target}`);

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Rock',
							description: 'This is a rock',
							value: 'rock',
						},
						{
							label: 'Cowboy',
							description: 'Yeehaw',
							value: 'cowboy',
						},
                        {
                            label: 'Scissors',
                            description: 'They cut pretty good.',
                            value: 'scissors'
                        },
                        {
                            label: 'Virus',
                            description: 'Pretty good when its not noticed',
                            value: 'virus'
                        },
                        {
                            label: 'Computer',
                            description: 'Beep Boop',
                            value: 'computer'
                        },
                        {
                            label: 'Wumpus',
                            description: 'Me wumpus you wumpus',
                            value: 'wumpus'
                        },
                        {
                            label: 'Paper',
                            description: 'It can slice...',
                            value: 'paper'
                        }
					]),
			);

		await interaction.reply({ content: `Your challenge was for ${target}`, components: [row] });
        
        // Need to figure out how to find the response
        // a user submits, I currently have the multiple
        // options set up. As well as a target player possible.
    }
}