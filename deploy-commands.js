const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord-api-types/v9');
const { clientId, token} = require('./config.json');
const { Collection } = require('discord.js');

const applicationId = '983950908767477791'
const guildId = ''

const commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.set(command.data.name, command)
}