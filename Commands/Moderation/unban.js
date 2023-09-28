const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Débannir un membre',
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: 'Modération',
    ownerOnly: false,
    options: [
        {
            type: 'user',
            name: 'utilisateur',
            description: 'Utilisateur à débannir ou bien son id',
            required: true,
            autocomplete: false
        },
        {
            type: 'string',
            name: 'raison',
            description: 'Raison du déban',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {
            let user = args.getUser('utilisateur');
            if(!user) return message.reply(`Pas d'utilisateur`);

            let reason = args.getString('raison')?.value;
            if(!reason) reason = 'Aucune raison donnée';

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply('Cet utilisateur n\'est pas banni !');

            try { await user.send(`Tu as été unban par ${message.user.tag} pour la raison : **${reason}**`)} catch (error) {
                console.log(error);
            }

            await message.reply(`${message.user} a unban ${user.tag} pour la raison suivante : **${reason}**`);

            await message.guild.members.unban(user, reason);

        } catch (error) {
            console.log(error);
            return message.reply('Pas d\'utilisateur à débannir');
        }
    }
}