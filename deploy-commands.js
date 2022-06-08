const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// import { dirname } from './utils.js'

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const filePath = path.join(commandsPath,file);
    const command = require(filePath);
    console.log('completed command adding');
    commands.push(command.data);
};
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationCommands(process.env.APP_ID, process.env.GUILD_ID), 
    { body: commands })
    .then(() => console.log('Succesfully registered application commands.'))
    .catch(console.error);