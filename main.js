const {Discord, EmbedBuilder, Client} = require('discord.js');
const Bot = new Client({intents: 3276799});

const token = require('./token.json').token;
const config = require('./config.json');

process.on("exit", code => {console.log(`Le processus c'est arrêté avec le code : ${code}`)});
process.on("uncaughtException", (err, origin) => {console.log(`UNCAUGHT_EXCEPTION : ${err}`, `ORIGIN : ${origin}`)});
process.on("unhandledRejection", (reason, promise) => {console.log(`UNHANDLED_REJECTION : ${reason}`, `PROMISE : ${promise}`)});
process.on("warning", (...args) => {console.log(...args)});

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

Bot.on('ready', async() => {
    setInterval(() => {
    Bot.user.setStatus(status[Math.floor(Math.random() * status.length)].status);
    }, 1000);
    Bot.user.setActivity(`${Bot.user.username} est en développement`);
    console.log(Bot.user)
})

Bot.on("guildMemberAdd", member => {
    console.log(member.user.tag + " a rejoint le serveur !");

    const embedJoin = new EmbedBuilder()
        .setAuthor({
            iconURL: Bot.user.displayAvatarURL(),
            name: Bot.user.username
        })
        .setTitle("CIRFA")
        .setDescription("<@" + member + "> bienvenu soldat ! \n\nPour avoir accès au reste du serveur, merci de te rendre dans le salon <#712269331408355374> et de suivre les instructions ! \n\nSi tu as des questions, n'hésite pas à demander à un membre du staff ! \n\nNous te souhaitons un bon séjour parmi nous !")
        .setThumbnail(member.user.displayAvatarURL())
        .setColor("#003E1C")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: Bot.user.displayAvatarURL(),
            text: Bot.user.tag
        });

    Bot.guild.channels.cache.get(config.welcome).send({ embeds: [embedJoin] });
});

Bot.on("guildMemberRemove", member => {
    console.log(member.user.tag + " a quitté le serveur !");

    const embedLeave = new EmbedBuilder()
        .setAuthor({
            iconURL: Bot.user.displayAvatarURL(),
            name: Bot.user.username
        })
        .setTitle("CIRFA")
        .setDescription("<@" + member + "> bienvenu soldat ! \n\nPour avoir accès au reste du serveur, merci de te rendre dans le salon <#712269331408355374> et de suivre les instructions ! \n\nSi tu as des questions, n'hésite pas à demander à un membre du staff ! \n\nNous te souhaitons un bon séjour parmi nous !")
        .setThumbnail(member.user.displayAvatarURL())
        .setColor("#950101")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: Bot.user.displayAvatarURL(),
            text: Bot.user.tag
        });

    Bot.guild.channels.cache.get(config.welcome).send({ embeds: [embedLeave] });
});

Bot.login(token);