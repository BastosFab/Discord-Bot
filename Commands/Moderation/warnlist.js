const Discord = require('discord.js');

module.exports = {
    name: 'warnlist',
    description: 'Affiche la liste des warns d\'un membre',
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: 'Modération',
    ownerOnly: false,
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'Le membre dont on veut voir les warns',
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser('membre');
        if(!user) message.reply({content: "Pas de membre !", ephemeral: true});

        let member = message.guild.members.cache.get(user.id);
        if(!member) message.reply({content: "Pas de membre !", ephemeral: true});

        db.query(`SELECT * FROM warns WHERE guild = '${message.guild.id}' AND user = '${user.id}'`, async (err, request) => {

            if (request.length < 1) return message.reply({content: `Aucun warn trouvé pour ${user.tag} !`, ephemeral: true});
            await request.sort((a, b) => parseInt(a.created_at) - parseInt(b.created_at));

            let WarnEmbed = new Discord.EmbedBuilder()
            .setColor(bot.color.warn)
            .setTitle(`Warns de ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });

            for (let i = 0; i < request.length; i++) {
                WarnEmbed.addFields([{
                    name: `Warn n°${i + 1}`,
                    value: `**Auteur**: ${await bot.users.fetch(request[i].author)}\n**Raison**: \`${request[i].reason}\`\n**Date**: <t:${Math.floor(parseInt(request[i].created_at) / 1000)}:F>)}`
                }])
            }

            await message.reply({embeds: [WarnEmbed]});
        });
    }
}