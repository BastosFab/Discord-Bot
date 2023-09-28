const Discord = require('discord.js');

module.exports = {

    name: 'ticket',
    description: 'Permet l\'envoie de l\'embed de ticket',
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: 'Administration',
    ownerOnly: false,
    options: [],

    async run(bot, message, args) {

        let TicketEmbed = new Discord.EmbedBuilder()
        .setColor(bot.color.primary)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setTitle('Création d\'un ticket')
        .setDescription(`Pour créer un ticket, cliquez sur la réaction ci-dessous 📩`)
        .setTimestamp()
        .setFooter({
            iconURL: bot.user.displayAvatarURL({dynamic: true}),
            text: 'DeltaBot \u00a9 2023'
        });

        const btn = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder().setCustomId('member').setLabel('Report un membre').setEmoji('😤').setStyle(Discord.ButtonStyle.Danger),
            new Discord.ButtonBuilder().setCustomId('bug').setLabel('Report un bug').setEmoji('⚙️').setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder().setCustomId('other').setLabel('Autre').setEmoji('📩').setStyle(Discord.ButtonStyle.Success),
        );
        await message.reply({embeds: [TicketEmbed], components: [btn]});

        message.reply({content: 'Le message ticket a bien été ajouté !', ephemeral: true});
    }
}