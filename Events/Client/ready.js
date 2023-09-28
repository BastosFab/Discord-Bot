const Discord = require('discord.js');
const loadSlahCommands = require('../../Handlers/handlerSlashCommands');
const loadDatabase = require('../../Handlers/handlerDatabase');

module.exports = async bot =>{

    await loadSlahCommands(bot);

    bot.db = await loadDatabase();
    bot.db.connect( function (error) {
        if(error) console.log(error);
        console.log("Connecté à la base de données MySQL !");
    })

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