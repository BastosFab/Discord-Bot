const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bannir un membre',
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: 'Modération',
    ownerOnly: false,
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'Membre à bannir',
            required: true,
            autocomplete: false
        },
        {
            type: 'string',
            name: 'raison',
            description: 'Raison du ban',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {
            // Check if user is in the server
            let user = await bot.users.fetch(args._hoistedOptions[0].value);
            if(!user) return message.reply('Pas de membre à bannir');
            let member = message.guild.members.cache.get(user.id);

            let reason = args.getString('raison');
            if(!reason) reason = 'Aucune raison donnée';

            // Check if the user is bannable
            if(message.user.id === user.id) return message.reply('Vous ne pouvez pas vous bannir vous même !');
            if((await message.guild.fetchOwner()).id === user.id) return message.reply('Vous ne pouvez pas bannir le propiétaire du serveur !');
            if(member && !member.bannable) return message.reply('Je ne peux pas bannir ce membre !');
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Vous ne pouvez pas bannir ce membre !');
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply('Ce membre est déjà banni !');

            try {
                await user.send(`Vous avez été banni du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
            } catch (error) {
                console.log(error);
            }

            await message.reply(`${message.user} a banni ${user.tag} pour la raison suivante : **${reason}**`);

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (error) {
            console.log(error);
            return message.reply('Pas de membre à bannir');
        }
    }
}