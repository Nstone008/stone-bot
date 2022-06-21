const { Channel, Intents, Client, Collection } = require('discord.js')
const dotenv = require('dotenv')
const fs = require('node:fs');
const path = require('node:path')
const { getCommandFiles } = require('./utils')
require('./setup/setup-commands');
dotenv.config();

// Store for in-progress games. In production, you'd want to use a DB
let activeGames = {};

// Creating the client with its options(currently intents)
const client = new Client({
    intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
    ],
});

//-- Events
const eventsPath = path.join(__dirname,'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//--

//-- Commands
client.commands = new Collection();

const commandsToCheck = getCommandFiles();

client.commands = commandsToCheck;
//--

// Login
client.login(process.env.DISCORD_TOKEN);