const { MessageActionRow, MessageButton } = require('discord.js');
const { getCommandFiles } = require('../utils');
const { setOpponentChoice } = require('../game');

// Currently this is the file that responds to interactions(Slash commands is the only version i know)

module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (interaction.isCommand()){

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
        else if(interaction.isSelectMenu()) {

            if (interaction.customId === 'select') {
                
                const user = interaction.user;
                const choice = interaction.values[0];

                console.log(choice, ' choice set from challenge message.');
                setOpponentChoice(choice);

                interaction.reply('Selection Made, Thank you.')

                // const randomChoice = getRandomChoice();

                // await interaction.deferUpdate();
                // const gameResult = getResult({
                //     id: user.id,
                //     objectName: choice
                // },{
                //     id: 'Stone Bot',
                //     objectName: randomChoice   
                // })
                // await wait(2000);                
                // await interaction.editReply({ content: gameResult, components: [] });
            }

        }
     }
}