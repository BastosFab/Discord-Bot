const Discord = require('discord.js');

module.exports = {
    name: 'botinfos',
    description: 'Permet de connaître toutes les informations du bot',
    permission: 'Aucune',
    dm: true,
    category: 'Informations',
    ownerOnly: false,

    async run(bot, message, args) {
        let memberCount = message.guild.memberCount;
        let totalMembers = bot.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b)
        let rolesCount = 0
        let chanelCount = 0
        
        bot.guilds.cache.forEach(guild => {
            return rolesCount = rolesCount + guild.roles.cache.size
        });

        bot.guilds.cache.forEach(guild => {
            return chanelCount = chanelCount + guild.channels.cache.size
        });

        const BotInfosEmbed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`Information du bot \`${bot.user.tag}\``)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription(`
            **🔵 __Informations sur le bot__**
            
            > **👨‍💻 | Développeur** : \`BastosFab\`
            > **👑 | Propriétaire** : \`BastosFab\`
            > **🤖 | Nom** : \`${bot.user.tag}\`
            > **🆔 | ID** : \`${bot.user.id}\`
            > **⚙️ | Version** : v\`1.0.0\`
            > **🛠️ | DiscordJs** : v\`${Discord.version}\`
            > **🟢 | Temps de connexion** : \`${Math.round(bot.uptime / (1000 * 60 * 60)) + 'heures, ' + (Math.round(bot.uptime / (1000 * 60)) % 60) + 'minutes, ' + (Math.round(bot.uptime / 1000) % 60) + 'secondes'}\`

            **🔵 __Informations sur les statistiques__**
            
            > **🌐 | Serveurs** : \`${bot.guilds.cache.size}\`
            > **🙋‍♂️ | Membres** : \`${totalMembers}\`
            > **✏️ | Salons** : \`${chanelCount}\`
            > **ℹ️ | Commandes** : \`${bot.commands.size}\`
        `)
        .setTimestamp()
        .setFooter({
            iconURL: bot.user.displayAvatarURL({dynamic: true}),
            text: 'DeltaBot \u00a9 2023'
        });

        await message.reply({embeds: [BotInfosEmbed]});
    }
}