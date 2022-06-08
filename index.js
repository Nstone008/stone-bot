const express = require('express');
require('./bot');
require('./deploy-commands');
const { VerifyDiscordRequest } = require('./utils');
const log = require('./temp/log')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
    log.log("This is my message")
});