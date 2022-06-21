const { verifyKey } = require('discord-interactions');
const { Collection } = require('discord.js');
const path = require('node:path')
const fs = require('node:fs');

const VerifyDiscordRequest = function (clientKey) {
    return function (req, res, buf, encoding) {
      const signature = req.get('X-Signature-Ed25519');
      const timestamp = req.get('X-Signature-Timestamp');
  
      const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
      if (!isValidRequest) {
        res.status(401).send('Bad request signature');
        throw new Error('Bad request signature');
      }
    };
  }

const DiscordRequest = async function (endpoint,options){
//export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

// Simple method that returns a random emoji from list
//export function getRandomEmoji() {
const getRandomEmoji = function () {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}
  
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
  VerifyDiscordRequest,
  getRandomEmoji,
  capitalize,
  getCommandFiles
}