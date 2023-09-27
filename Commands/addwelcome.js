const Discord = require('discord.js');

module.exports = {
    name:"addwelcome",
    description: "Permet d'ahouter un message de bienvenu au serveur",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [],

    async run(bot, message, args) {
        const db = bot.db;

        const embedId = new Discord.EmbedBuilder()
        .setDescription("Veuillez entrer l'id du salon de bienvenue ⬇️")

        db.query(`SELECT * FROM `)

    }

}