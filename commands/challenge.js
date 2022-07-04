const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { getShuffledOptions, getCurrentChoice, getResult, setOpponentChoice } = require('../game');
const { waitUntil, TimeoutError } = require('async-wait-until/dist/commonjs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('challenge')
    .setDescription('Verbally challenge another user!!!')
    .addUserOption(option => option.setName('user')
                                    .setDescription('Select a user')
                                    )
    .addStringOption(option => option.setName('choice')
                                    .setDescription('Pick your weapon?')
                                    .addChoices({ name: 'scissors', value: 'scissors' },
                                                { name: 'cowboy', value: 'cowboy' },
                                                { name: 'rock', value: 'rock' },
                                                { name: 'paper', value: 'paper' },
                                                { name: 'virus', value: 'virus' },
                                                { name: 'computer', value: 'computer' },
                                                { name: 'wumpus', value: 'wumpus' })
                                    )
    ,
    async execute(interaction){
        
        //const choice = interaction.options.getString('category')
        const user = interaction.options.getUser('user');

        const challengerChoice = interaction.options.getString('choice');

        // await interaction.deferUpdate();
        
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Pick option')
            .addOptions(getShuffledOptions())
			);
            
        if (user !== null) {
                       
            await interaction.reply(`Your challenge was for ${user}`);
            await user.send({content: `You have been challenged by ${user}`, components: [row]});

            // Need to figure ouy how to make this wait until some bit of information if stored
            // if not received after certain amount of time, challenge will be auto played by the bot

            //Update: found the module async-wait-until 

            try {
                //await waitUntil(() => getCurrentChoice() != {}, { timeout: 30000});  
                await waitUntil(() => getCurrentChoice() !== '', { timeout: 30000});  
                console.log(getCurrentChoice(), 'user challenged choice');
                const gameResult = getResult({
                        id: user.id,
                        objectName: getCurrentChoice()
                    },{
                        id: interaction.user.id,
                        objectName: challengerChoice   
                    });              

                setOpponentChoice('');
                console.log(getCurrentChoice(), 'user challenged choice');
                await interaction.editReply({ content: gameResult, components: [] });
            } catch (e) {
                if (e instanceof TimeoutError) {
                    await interaction.editReply({ content: 'Challenger failed to pick choice ', components: [] });
                }
                else {
                    await interaction.editReply({ content: 'Some other error happened...', components: [] });
                }
            }
            
        }
        else{
            await interaction.reply('Something was not set, challenge failed...')
        }

        
    }
}