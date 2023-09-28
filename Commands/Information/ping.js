const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Renvoie le ping du bot',
    permission: 'Aucune',
    dm: false,
    category: 'Informations',
    ownerOnly: true,

    async run(bot, message) {
        await message.reply(`Ping : \`${bot.ws.ping}\`ms`);
    }
}