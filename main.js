const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ]});

const config = require('./config');

let status = [
    {
        status: 'idle'
    },
    {
        status: 'online'
    },
    {
        status: 'dnd'
    }
];

bot.on('ready', async() => {
    setInterval(() => {
    bot.user.setStatus(status[Math.floor(Math.random() * status.length)].status);
    }, 1000);
    bot.user.setActivity(`${bot.user.username} est en développement`);
    console.log(bot.user)
})

bot.login(config.token);