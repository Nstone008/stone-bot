const { MessageActionRow, MessageButton } = require('discord.js');
const { collectionCommands} = require('../setup-commands')

// Currently this is the file that responds to interactions(Slash commands is the only version i know)

module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`)
        // interaction.reply('Hi there!')

        if (!interaction.isCommand()) return;

        // console.log(interaction.commandName)
        console.log(collectionCommands)
        
    
        // For some reason when I export the array of commands it loses the function
        // but still has the data
    //     const command = commands.find(element => interaction.commandName === element.name);
    //     console.log(command)
        
    //     if (!command) return;

    //     try {
    //         await command.execute(interaction);
    //     } catch (error) {
    //         console.error(error);
    //         await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    //     }
     }
}