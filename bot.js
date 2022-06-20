const { Channel, Intents, Client, Collection } = require('discord.js')
const dotenv = require('dotenv')
const fs = require('node:fs')
const path = require('node:path')
require('./setup-commands');
dotenv.config();

// Store for in-progress games. In production, you'd want to use a DB
let activeGames = {};

//Creating the client with its options(currently intents)
const client = new Client({
    intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
    ],
});

// Events
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

// Commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command)
}

//const commandsToCheck = client.commands;

// Dynamic Command Execution
client.on('interactionCreate',async (interaction) => {

    //Checks all the commands
    const command = client.commands.get(interaction.commandName);

    // if no command is found, exit function
    if (!command) return;

    try {
        //Executing function
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
})

client.login(process.env.DISCORD_TOKEN);