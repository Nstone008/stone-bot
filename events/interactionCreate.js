const { MessageActionRow, MessageButton } = require('discord.js');
// Currently this is the file that responds to interactions(Slash commands is the only version i know)

module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`)
        // interaction.reply('Hi there!')

        if (!interaction.isCommand()) return;

        //console.log(getCommands())

        // const command = commandsToCheck.get(interaction.commandName);

        // if (!command) return;

        // try {
        //     await command.execute(interaction);
        // } catch (error) {
        //     console.error(error);
        //     await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        // }
    }
}