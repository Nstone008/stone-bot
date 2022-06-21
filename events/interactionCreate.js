const { MessageActionRow, MessageButton } = require('discord.js');
const { getCommandFiles } = require('../utils')

// Currently this is the file that responds to interactions(Slash commands is the only version i know)

module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (!interaction.isCommand()) return;

        const commandsToCheck = getCommandFiles();

        //-- Dynamic Command Execution
        const command = commandsToCheck.find(element => element.data.name === interaction.commandName);
        
        if (!command){
            return await interaction.reply(`Can't find the command ${interaction.commandName}`)
        };

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        //--
     }
}