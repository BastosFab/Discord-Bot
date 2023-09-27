const Discord = require('discord.js');

module.exports = async (bot, interaction) => {

    const ownerId = '199629311911788544';

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused();

        if (interaction.commandName === 'help') {
            let choices = bot.commands.filter(cmd => cmd.name.includes(entry));
            await interaction.respond(entry === '' ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commands/${interaction.commandName}`);

        if (command.ownerOnly && interaction.user.id !== ownerId) return interaction.reply({content: 'Seul le développeur du bot peut utiliser cette comande !', ephemeral: true});
        command.run(bot, interaction, interaction.options, bot.db);
    }

    if(interaction.isButton()) {

        if(interaction.customId === 'ticket') {

            console.log(interaction);

            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: Discord.ChannelType.GuildText,
            });

            await channel.setParent(interaction.channel.parent.id);

            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false,
            });
            await channel.permissionOverwrites.create(interaction.user, {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true,
            });
            // Mettre l'id du rôle support
            await channel.permissionOverwrites.create('1156270894705037522', {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true,
            });
            
            await channel.setTopic(interaction.user.id);
            await interaction.reply({content: `Votre ticket a été créé dans ${channel}`, ephemeral: true});

            let TicketEmbed = new Discord.EmbedBuilder()
            .setColor(bot.color.primary)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setTitle(`Ticket de ${interaction.user.username}`)
            .setDescription('Pour fermer le ticket, cliquez sur la réaction ci-dessous 🗑️')
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });
    
            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId('close')
            .setLabel('Fermer le ticket')
            .setEmoji('🗑️')
            .setStyle(Discord.ButtonStyle.Danger));
    
            await channel.send({embeds: [TicketEmbed], components: [btn]});
        }

        if (interaction.customId === 'close') {
            
            let user = bot.users.cache.get(interaction.channel.topic)
            try{ await user.send('Votre ticket a été fermé !')} catch (error) {}

            await interaction.channel.delete();
        }
    }
}