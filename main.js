const {Discord, EmbedBuilder, Client, Collection} = require('discord.js');
const bot = new Client({intents: 3276799});
const loadCommands = require('./Loaders/LoadCommands');
const loadEvents = require('./Loaders/LoadEvents');

const token = require('./token.json').token;
const config = require('./config.json');

process.on("exit", code => {console.log(`\x1b[33mLe processus c'est arrêté avec le code : ${code}\x1b[33m`)});
process.on("uncaughtException", (err, origin) => {console.log(`\x1b[33mUNCAUGHT_EXCEPTION : ${err}`, `ORIGIN : ${origin}\x1b[33m`)});
process.on("unhandledRejection", (reason, promise) => {console.log(`\x1b[33mUNHANDLED_REJECTION : ${reason}`, `PROMISE : ${promise}\x1b[33m`)});
process.on("warning", (...args) => {console.log(...args)});

bot.commands = new Collection();

bot.on("guildMemberAdd", member => {
    console.log(member.user.tag + " a rejoint le serveur !");

    const embedJoin = new EmbedBuilder()
        .setAuthor({
            iconURL: bot.user.displayAvatarURL(),
            name: bot.user.username
        })
        .setTitle("CIRFA")
        .setDescription("<@" + member + "> bienvenu soldat ! \n\nPour avoir accès au reste du serveur, merci de te rendre dans le salon <#712269331408355374> et de suivre les instructions ! \n\nSi tu as des questions, n'hésite pas à demander à un membre du staff ! \n\nNous te souhaitons un bon séjour parmi nous !")
        .setThumbnail(member.user.displayAvatarURL())
        .setColor("#003E1C")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: bot.user.displayAvatarURL(),
            text: bot.user.tag
        });

    bot.channels.cache.get(config.welcome).send({ embeds: [embedJoin] });
});

bot.on("guildMemberRemove", member => {
    console.log(member.user.tag + " a quitté le serveur !");

    const embedLeave = new EmbedBuilder()
        .setAuthor({
            iconURL: bot.user.displayAvatarURL(),
            name: bot.user.username
        })
        .setTitle("CIRFA")
        .setDescription("<@" + member + "> bienvenu soldat ! \n\nPour avoir accès au reste du serveur, merci de te rendre dans le salon <#712269331408355374> et de suivre les instructions ! \n\nSi tu as des questions, n'hésite pas à demander à un membre du staff ! \n\nNous te souhaitons un bon séjour parmi nous !")
        .setThumbnail(member.user.displayAvatarURL())
        .setColor("#950101")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: bot.user.displayAvatarURL(),
            text: bot.user.tag
        });

    bot.channels.cache.get(config.welcome).send({ embeds: [embedLeave] });
});

bot.login(token);

loadCommands(bot);
loadEvents(bot);