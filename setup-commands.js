const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// Gathers all file names
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '983950908767477791';
const guildId = '876543210987654321';

//Using the file name
for (const file of commandFiles) {
    // takes the files to allow it to be stored
    const command = require(`./commands/${file}`);
    // in JSON then stores each file in the array
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // REST call to add the commands for the bot
		await rest.put(
			Routes.applicationCommands(clientId),
            // The commands to apply
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();