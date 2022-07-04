const { Collection } = require('discord.js');
const path = require('node:path')
const fs = require('node:fs');
  
//export function capitalize(str) {
const capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getCommandFiles = function () {

  const commandsTemp = new Collection();

  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for(const file of commandFiles){
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      commandsTemp.set(command.data.name, command)
  };

  return commandsTemp;
}


module.exports = {
  capitalize,
  getCommandFiles,
}