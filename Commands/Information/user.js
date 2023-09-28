const Discord = require('discord.js');
const { stat } = require('fs');

module.exports = {
    name: 'user',
    description: 'Permet de connaître toutes les informations d\'un utilisateur',
    permission: 'Aucune',
    dm: true,
    category: 'Informations',
    ownerOnly: false,
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'L\'utilisateur à afficher',
            required: false,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {

        try {
            
            let user;
            if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
                user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
                if(!user) return message.reply('Aucune personne trouvé');
            } else user = message.user ? message.user : message.author;

            const date = new Date();
            
            let member = message.guild.members.cache.get(user.id);
            if (member) {
                if (member.presence) {
                    console.log(member.presence.status)
                } else console.log('Inconnu');
            }

            // GESTION DU STATUS
            let status;
            if (member) {
                if (member.presence) {
                    if (member.presence.status === 'online') {
                        status = '🟢';
                    } else if (member.presence.status === 'idle') {
                        status = '🟠';
                    } else if (member.presence.status === 'dnd') {
                        status = '🔴';
                    } else if (member.presence.status === 'offline' || member.presence.status === 'invisible') {
                        status = '⚫';
                    } else if (member.presence.status === 'streaming') {
                        status = '🟣';
                    }
                } else status = '⚫';
            } else status = 'Inconnu';
            // ---- ---- ---- ---- //


            // ---- ---- GESTION DES BADGES ---- ---- //
            const flags = user.flags.toArray();
            let badges = [];
            let badgeIcon = [];

            badges = (await user.fetchFlags()).toArray();

            badges.forEach(badge => {
                if ( badge === 'Staff') badgeIcon.push('<:dltf_discord_staff:1154851720187363459>');
                if ( badge === 'Partner') badgeIcon.push('<:dltf_partner:1154852055920418816>');
                if ( badge === 'CertifiedModerator') badgeIcon.push('<:dltf_certified_moderator:1154851656576544818>');
                if ( badge === 'HypeSquad') badgeIcon.push('<:dltf_hypesquad:1154851843260813342>');
                if ( badge === 'HypeSquadOnlineHouse1') badgeIcon.push('<:dltf_house_bravery:1154851275733729391>');
                if ( badge === 'HypeSquadOnlineHouse2') badgeIcon.push('<:dltf_house_brilliance:1154851359644983407>');
                if ( badge === 'HypeSquadOnlineHouse3') badgeIcon.push('<:dltf_house_balance:1154851206875861052>');
                if ( badge === 'BugHunterLevel1') badgeIcon.push('<:dltf_hunter_1:1154851448606171237>');
                if ( badge === 'BugHunterLevel2') badgeIcon.push('<:dltf_hunter_2:1154851907525951650>');
                if ( badge === 'ActiveDeveloper') badgeIcon.push('<:dltf_active_developer:1154851134960312380>');
                if ( badge === 'VerifiedDeveloper') badgeIcon.push('<:dltf_verified_bot_developer:1154852206600802304>');
                if ( badge === 'PremiumEarlySupporter') badgeIcon.push('<:dltf_early_supporter:1154851776403619850>');
                if ( badge === 'VerifiedBot') badgeIcon.push('<:dltf_verified_bot:1154852145879863447>');
            });
            // ---- ---- ---- ---- //


            const UserEmbed = new Discord.EmbedBuilder()
            .setColor(bot.color.primary)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTitle(`🙋‍♂️ Informations sur l'utilisateur ${user.tag}\n`)
            .setDescription(`
                **🔵 __Informations sur l'utilisateur__**\n
                > **👑 | Nom** : \`${user.tag}\` - ${user}
                > **#️⃣ | Tag** : \`${user.discriminator}\`
                > **🆔 | Identifiant** : \`${user.id}\`
                > **🤖 | Robot** : \`${user.bot ? 'Oui' : 'Non'}\`
                > **<a:dltf_status:1156155320733802548> | Status** : ${status}
                > **<a:dltf_badges:1156140116591525928> | Badges** : ${(await user.fetchFlags()).toArray().length >- 1 ? badgeIcon.join(' ') : 'Aucun'}
                > **📆 | Date de création** : <t:${Math.floor(user.createdAt / 1000)}:F> \`(il y a ${Math.floor(Math.abs(date - user.createdAt) / 1000 / 60 / 60 / 24)} jours)\`

                ${member ? `**🔵 __Informations sur le membre__**\n
                > **🏷️ | Surnom** : ${member.nickname ? member.nickname : 'Aucun'}
                > **📆 | Date d'arrivée** : <t:${Math.floor(member.joinedAt / 1000)}:F> \`(il y a ${Math.floor(Math.abs(date - member.joinedAt) / 1000 / 60 / 60 / 24)} jours)\`
                > **🛡️ | Rôle(s)** : ${member.roles.cache.filter(role => role.id !== message.guild.id).map(role => role.toString()).join(' ')}` : ''}
            `)
            .setImage(await (await bot.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });
            
            await message.reply({embeds: [UserEmbed]});
        } catch (error) {
            console.log(error)
            await message.reply('Aucune personne trouvé');
        }
    }
}