const Discord = require('discord.js');

module.exports = {

    name: 'ticket',
    description: 'Permet l\'envoie de l\'embed de ticket',
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: 'Administration',
    ownerOnly: false,
    options: [
        {
            type: 'role',
            name: 'role',
            description: 'Role qui sert de support pour les tickets',
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {

        console.log(args._hoistedOptions[0].value)

        let TicketEmbed = new Discord.EmbedBuilder()
        .setColor(bot.color.primary)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setTitle('Création d\'un ticket')
        .setDescription(`Pour créer un ticket, cliquez sur la réaction ci-dessous 📩\n Un ${args._hoistedOptions[0].value}`)
        .setTimestamp()
        .setFooter({
            iconURL: bot.user.displayAvatarURL({dynamic: true}),
            text: 'DeltaBot \u00a9 2023'
        });

        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId('ticket')
        .setLabel('Créer un ticket')
        .setEmoji('📩')
        .setStyle(Discord.ButtonStyle.Primary));

        await message.reply({embeds: [TicketEmbed], components: [btn]});
    }
}