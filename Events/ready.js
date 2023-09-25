const Discord = require('discord.js');
const loadSlahCommands = require('../Loaders/LoadSlashCommands');

module.exports = async bot =>{

    await loadSlahCommands(bot);

    const status = [
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
    
    console.log(`${bot.user.username} - En ligne`);

    setInterval(() => {
        bot.user.setStatus(status[Math.floor(Math.random() * status.length)].status);
    }, 1000);

    bot.user.setActivity(`${bot.user.username} est en développement`);
}