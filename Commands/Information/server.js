const Discord = require('discord.js');
const { stat } = require('fs');

module.exports = {
    name: 'server',
    description: 'Permet de connaître toutes les informations du serveur',
    permission: 'Aucune',
    dm: false,
    category: 'Informations',
    ownerOnly: false,

    async run(bot, message, args) {

            const date = new Date();

            // ---- ---- MEMBERS STATUS ---- ---- //
            let memberStatusOnline = 0;
            let memberStatusDnd = 0;
            let memberStatusStreaming = 0;
            let memberStatusOffline = 0;
            let memberStatusIdle = 0;

            message.guild.members.cache.forEach(member => {
                if (member.presence) {
                    if (member.presence.status === 'online') {
                        memberStatusOnline++;
                    } else if (member.presence.status === 'idle') {
                        memberStatusIdle++;
                    } else if (member.presence.status === 'dnd') {
                        memberStatusDnd++;
                    } else if (member.presence.status === 'offline' || member.presence.status === 'invisible') {
                        memberStatusOffline++;
                    } else if (member.presence.status === 'streaming') {
                        memberStatusStreaming++;
                    }
                } else memberStatusOffline++;
            });
            // ---- ---- ---- ---- ---- ---- ---- //


            // ---- ---- GESTION DES CHANNELS ---- ---- //
            let category = 0;
            let channelText = 0;
            let channelVoice = 0;
            let channelStage = 0;
            let channelForum = 0;
            let channelNews = 0;

            message.guild.channels.cache.forEach(channel => {

                const GUILD_TEXT = channel.type === 0;
                const DM = channel.type === 1;
                const GUILD_VOICE = channel.type === 2;
                const GROUP_DM = channel.type === 3;
                const GUILD_CATEGORY = channel.type === 4;
                const GUILD_ANNOUNCEMENT = channel.type === 5;
                const ANNOUNCEMENT_THREAD = channel.type === 10;
                const PUBLIC_THREAD = channel.type === 11;
                const PRIVATE_THREAD = channel.type === 12;
                const GUILD_STAGE_VOICE = channel.type === 13;
                const GUILD_DIRECTORY = channel.type === 14;
                const GUILD_FORUM = channel.type === 15;
                const GUILD_MEDIA = channel.type === 16;
                
                if (GUILD_CATEGORY) {
                    category++;
                } else if (GUILD_TEXT) {
                    channelText++;
                } else if (GUILD_VOICE) {
                    channelVoice++;
                } else if (GUILD_STAGE_VOICE) {
                    channelStage++;
                } else if (GUILD_FORUM) {
                    channelForum++;
                } else if (GUILD_ANNOUNCEMENT) {
                    channelNews++;
                }

            });
            // ---- ---- ---- ---- ---- ---- ---- //


            // ---- ---- GESTION DE LA PROTECTION ---- ---- //
            let protection;
            if(message.guild.verificationLevel) {
                const NONE = 0;
                const LOW = 1;
                const MEDIUM = 2;
                const HIGH = 3;
                const VERY_HIGH = 4;

                if (message.guild.verificationLevel === NONE) protection = 'Aucune';
                if (message.guild.verificationLevel === LOW) protection = 'Faible';
                if (message.guild.verificationLevel === MEDIUM) protection = 'Moyenne';
                if (message.guild.verificationLevel === HIGH) protection = 'Haute';
                if (message.guild.verificationLevel === VERY_HIGH) protection = 'Maximale';
            } else protection = 'Aucune';
            // ---- ---- ---- ---- ---- ---- ---- //

            console.log(message.guild.channels)

            const UserEmbed = new Discord.EmbedBuilder()
            .setColor(bot.color.primary)
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setTitle(`🙋‍♂️ Informations sur le serveur ${message.guild.name}\n`)
            .setDescription(`
                **🔵 __Informations sur le serveur__**\n
                > **🌐 | Nom** : \`${message.guild.name}\`
                > **🆔 | Identifiant** : \`${message.guild.id}\`
                > **✏️ | Description** : \`${message.guild.description ? message.guild.description : 'Aucune'}\`
                > **👑 | Porpriétaire** : \`${(await message.guild.fetchOwner()).user.tag}\` - ${(await message.guild.fetchOwner())}
                > **<a:dltf_boost:1156217750335782962> | Boost ** : \`${message.guild.premiumSubscriptionCount} (tier ${message.guild.premiumTier})\`
                > **📆 | Date de création** : <t:${Math.floor(message.guild.createdAt / 1000)}:F> \`(il y a ${Math.floor(Math.abs(date - message.guild.createdAt) / 1000 / 60 / 60 / 24)} jours)\`
                > **<:dltf_certified_moderator:1154851656576544818> | Protection** : \`${protection}\`

                **🔵 __Informations sur les membres__**\n
                > **👥 | Membres** : \`${message.guild.members.cache.size}/${message.guild.maximumMembers}\`
                > **🟢 | Online** : \`${memberStatusOnline}\`
                > **🟠 | Idle** : \`${memberStatusIdle}\`
                > **🔴 | Dnd** : \`${memberStatusDnd}\`
                > **🟣 | Streaming** : \`${memberStatusStreaming}\`
                > **⚫ | Offline** : \`${memberStatusOffline}\`
                > **🤖 | Bots** : \`${message.guild.members.cache.filter(member => member.user.bot).size}\`

                **🔵 __Informations sur les channels__**\n
                > **📋 | Règlements** : ${message.guild.rulesChannel ? message.guild.rulesChannel : '\`Aucun\`'}
                > **💤 | AFK** : ${message.guild.afkChannel ? message.guild.afkChannel : '\`Aucun\`'}

                **🔵 __Informations sur les statistiques__**\n
                > **🗂 | Nombres de catégories** : \`${category}\`
                > **📢 | Stage** : \`${channelStage}\`
                > **📣 | Forum** : \`${channelForum}\`
                > **🔔 | Annonces** : \`${channelNews}\`
                > **💬 | Nombre de salons textuels** : \`${channelText}\`
                > **🔊 | Nombre de salons vocaux** : \`${channelVoice}\`
                > **📝 | Nombre de salons** : \`${message.guild.channels.cache.size}\`
                > **🛡️ | Nombre de rôles** : \`${message.guild.roles.cache.size}\`
                > **😆 | Nombre d'émojis** : \`${message.guild.emojis.cache.size}\`
            `)
            .setImage(message.guild.bannerURL({dynamic: true, size: 4096}))
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });
            
            await message.reply({embeds: [UserEmbed]});
    }
}