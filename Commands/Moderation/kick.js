const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick un membre',
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: 'Modération',
    ownerOnly: false,
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'Membre à kick',
            required: true,
            autocomplete: false
        },
        {
            type: 'string',
            name: 'raison',
            description: 'Raison du kick',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        // Check if user is in the server
        let user = args.getUser('membre');
        if(!user) return message.reply('Pas de membre à kick');
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply('Pas de membre à kick');

        let reason = args.getString('raison');
        if(!reason) reason = 'Aucune raison donnée';

        // Check if the user is bannable
        if(message.user.id === user.id) return message.reply('Vous ne pouvez pas vous kick vous même !');
        if((await message.guild.fetchOwner()).id === user.id) return message.reply('Vous ne pouvez pas kick le propiétaire du serveur !');
        if(member && !member.kickable) return message.reply('Je ne peux pas kick ce membre !');
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Vous ne pouvez pas kick ce membre !');

        try {
            await user.send(`Vous avez été kick du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
        } catch (error) {
            console.log(error);
        }

        await message.reply(`${message.user} a kick ${user.tag} pour la raison suivante : **${reason}**`);

        await member.kick(reason);
    }
}