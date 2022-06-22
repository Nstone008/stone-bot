const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const { getShuffledOptions } = require('../game')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('challenge')
    .setDescription('Verbally challenge another user!!!')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
    async execute(interaction){
        
        //const choice = interaction.options.getString('category')
        const target = interaction.options.getUser('target');

        //await interaction.reply(`Challenger picked ${choice}, Your challenge was for ${target}`);

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
                    .setMaxValues(1)
                    .addOptions(getShuffledOptions())
			);

		await interaction.reply({ content: `Your challenge was for ${target}`, components: [row] });
        
    }
}