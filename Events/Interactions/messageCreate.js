const Discord = require('discord.js');

module.exports = async (bot, message) => {

    let prefix = '?';

    let messageArray = message.content.split(' ');
    let arguments = messageArray.slice(1);

    let db = bot.db;

    db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, request) => {

        if(request.length < 1) {
            db.query(`INSERT INTO server (guild, captcha, welcomeChannel) VALUES ('${message.guild.id}', 'false', 'false')`);
        }

    });

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    let command = require(`../Commands/${messageArray[0].slice(prefix.length)}`);
    if(!command) return message.reply('Cette commande n\'existe pas');

    command.run(bot, message, arguments);
}