const Discord = require('discord.js');

module.exports = {
    name:"banlist",
    description: "This command serve to get the list of all server bans!",
    permission: Discord.PermissionFlagsBits.BanMembers,
    utilisation: "/banlist",
    dm: false,
    category: "Modération",
    options: [],

    async run(bot, interaction) {

        const fetchBans = await interaction.guild.bans.fetch();
        const ID = fetchBans.map((m) => m.user.id);

        let i = 0;
        const allBans = [];
        const allBans2 = [];
        const IDArray = [];

        for (const member of fetchBans.map((m) => m.user.tag).values()) {
            allBans.push(`${i + 1}. ${member}`);
            allBans2.push(member);
            ++i;
        }

        
        for(const id of ID) {
            IDArray.push(id);
        }

        const BansEmbed = new Discord.EmbedBuilder()
            .setTitle("Ban Lists")
            .setDescription(`> **Number of bans :** \`${fetchBans.size}\`\n\`\`\`${allBans.join("\n")}\`\`\``)
            .setColor(bot.color.primary)
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });

        const NotBans = new Discord.EmbedBuilder()
            .setTitle("Ban Lists")
            .setDescription("There are no bans on this server!")
            .setColor(bot.color.primary)
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });

        if (allBans2.length <= 0) return interaction.reply({ embeds: [NotBans], ephemeral: true });

        const select = new Discord.StringSelectMenuBuilder()
            .setCustomId("unbans")
            .setPlaceholder("Débanir un membre");

        for (let i = 0; i < allBans2.length; i++) {
            const id = IDArray[i];
            select.addOptions(
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel(`${allBans2[i]}`)
                    .setDescription(`Débanir ${allBans2[i]}`)
                    .setValue(`${id}|${allBans2[i]}`)
            )
        }

        const TropDeLengthDansUnSelectMenu = new Discord.EmbedBuilder()
            .setTitle("Ban Lists")
            .setDescription("Vous ne pouvez pas débanir les membre car la liste a dépassé la limite de 25 membres !")
            .setColor(bot.color.primary)
            .setTimestamp()
            .setFooter({
                iconURL: bot.user.displayAvatarURL({dynamic: true}),
                text: 'DeltaBot \u00a9 2023'
            });

        if (allBans2.length > 25) return interaction.reply({ embeds: [TropDeLengthDansUnSelectMenu], ephemeral: true });

        const row = new Discord.ActionRowBuilder()
            .addComponents(select);

        const msg = await interaction.reply({ embeds: [BansEmbed], components: [row] });

        const time = ms("63 360 000")
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time });

        collector.on("collect", async i => {
            if (!i.member.permissions.has(PermissionFlagsBits.BanMembers)) return i.reply({ content: "Vous n'avez pas la permission de continuer !", ephemeral: true });
            const memberID = await i.values.toString().split("|")[0];


            await interaction.guild.members.unban(memberID).then(async (user) => {
                const Embed = new Discord.EmbedBuilder()
                    .setTitle("Unban")
                    .setDescription(`\`${user.tag}\` was successfully unbanned!`)
                    .setColor(bot.color.primary)
                    .setTimestamp()
                    .setFooter({
                        iconURL: bot.user.displayAvatarURL({dynamic: true}),
                        text: 'DeltaBot \u00a9 2023'
                    });

                await i.reply({ embeds: [Embed], ephemeral: true });
                await msg.delete();
            }).catch((err) => {
                console.log(err);
                return i.reply({ content: `An error occurred: ${err.message}\n\n**Contact the owner of this command:** \`kiritothereal\`` });
            });
        });
    },
};