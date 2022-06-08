const {Channel, Intents, Client, Collection} = require('discord.js')
const dotenv = require('dotenv')
const fs = require('node:fs')
const path = require('node:path')
// import { fileURLToPath } from 'node:url';
// import { dirname } from './utils.js'
dotenv.config();

// Store for in-progress games. In production, you'd want to use a DB
let activeGames = {};

//Creating the client with its options(currently intents)
const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
});

client.on('ready', () => {
    console.log('The bot is ready')
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async (message) => {
    if(message.content === 'ping')
    {
        message.reply({
            content: 'pong'
        })
    }
    if(message.content.includes('fuck')){
        message.reply({
            content: 'That is not nice'
        })
    }
    
});

//Command Handling
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //client.commands.set(command.data.name, command)
}

client.login(process.env.DISCORD_TOKEN);