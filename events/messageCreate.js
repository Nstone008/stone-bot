// Any message in a channel the bot has permissions
// would go through here
module.exports = {
    name: 'messageCreate',
    async execute(message){
        const content = message.content;

        if (content === 'ping') {
            message.reply('Pong, you found an easter egg!');
        }
    }
};