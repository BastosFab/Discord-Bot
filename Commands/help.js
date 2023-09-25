const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Permet de connaître toutes les commandes du bot',
    permission: 'Aucune',
    dm: false,
    category: 'Informations',
    ownerOnly: false,
    options: [
        {
            type: 'string',
            name: 'commande',
            description: 'La commande à afficher',
            required: false,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {
        
        let command;
        if (args.getString('commande')) {
            command = bot.commands.get(args.getString('commande'));
            if (!command) return message.reply('Cette commande n\'existe pas !');
        }

        if (!command) {

            // Créer les catégories
            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category);
            });

            let HelpEmbed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Information sur les commandes du bot')
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`\u25cf** Pour plus d'information sur une commande : **\`/help [commande]\` \n\u25cf** Commandes disponibles : **\`${bot.commands.size}\``)
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });

            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat);
                HelpEmbed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join('\n')}`});
            })

            await message.reply({embeds: [HelpEmbed]});
        } else {

            let CommandEmbed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Commande help`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Nom : \`${command.name}\` \nDescription : \`${command.description}\` \nPermission requise : \`${typeof command.permission !== 'bigint' ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\` \nCommande en DM : \`${command.dm ? 'Oui' : 'Non'}\``)
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });

            await message.reply({embeds: [CommandEmbed]});
        }
    }
}