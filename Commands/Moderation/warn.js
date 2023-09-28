const Discord = require('discord.js');

module.exports = {
    name: 'warn',
    description: 'Warn un membre',
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: 'Modération',
    ownerOnly: false,
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'Le membre à warn',
            required: true,
            autocomplete: false
        },
        {
            type: 'string',
            name: 'raison',
            description: 'La raison du warn',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser('membre');
        if(!user) message.reply({content: "Pas de membre !", ephemeral: true});

        let member = message.guild.members.cache.get(user.id);
        if(!member) message.reply({content: "Pas de membre !", ephemeral: true});

        let reason = args.getString('raison');
        if(!reason) reason = "Aucune raison donnée";

         // Check if the user is bannable
         if(message.user.id === user.id) return message.reply('Vous ne pouvez pas vous warn vous même !');
         if((await message.guild.fetchOwner()).id === user.id) return message.reply('Vous ne pouvez pas warn le propiétaire du serveur !');
         if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Vous ne pouvez pas warn ce membre !');
         if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Le bot ne peut pas warn ce membre !');

         try { await user.send(`${message.user.tag} vous a warn pour la raison suivante : \`${reason}\``); } catch (error) {}

         await message.reply({content: `Vous avez warn ${user.tag} pour la raison suivante : \`${reason}\` avec succès !`, ephemeral: true});

         let id = await bot.functions.createId('WARN');
         db.query(`INSERT INTO warns (guild, user, author, warn, reason, created_at) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${id}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
    }
}