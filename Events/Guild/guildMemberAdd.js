const Discord = require('discord.js');

module.exports = async (bot, member, db) => {

    db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, request) => {

        if(request.length < 1 || Boolean(request[0].captcha === false)) return;

        let channel = member.guild.channels.cache.get(request[0].captcha);
        if(!channel) return;

        await channel.permissionOverwrites.create(member.user, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true });

        let captcha = await bot.functions.generateCaptcha();

        let msg = await channel.send({ content: `${member}, vous avez 2 minutes pour compléter le captcha ! Si vous ne réussissez pas vous serez exclu du serveur !`, files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), {name: 'captcha.png'})] });

        try {
            let filter = m => m.author.id === member.user.id;
            let response = (await channel.awaitMessages({ filter, max: 1, time: 120000, errors: ['time'] })).first();

            if(response.content === captcha.text) {

                await msg.delete();
                await response.delete();
                try { await member.user.send({ content: 'Vous avez réussi le captcha !' }); } catch (error) { console.log(error); }
                await channel.permissionOverwrites.delete(member.user.id);
            } else {
                
                await msg.delete();
                await response.delete();
                try { await member.user.send({ content: 'Vous avez échoué le captcha !' }); } catch (error) { console.log(error); }
                await channel.permissionOverwrites.delete(member.user.id);
                await member.kick('Captcha non réussi !');
            }

        } catch (error) {

            await msg.delete();
            try { await member.send({ content: 'Vous avez trop de temps pour compléter le captcha !' }); } catch (error) { console.log(error); }
            await channel.permissionOverwrites.delete(member.user.id);
            await member.kick('Captcha non complété');
        }

    });

    try {
        db.query(`SELECT * FROM welcome WHERE guild_id = '${member.guild.id}'`, async (err, request) => {
            if (request.length < 1) {
                return;
            } else {
                const title = request[0].title;
                const description = request[0].description;
                const footer = request[0].footer;
                const timestamp = request[0].timestamp;
                const image = request[0].image;

                const embed = new Discord.EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(bot.color.primary)
                .setFooter({
                    iconURL: bot.user.displayAvatarURL(),
                    text: footer | `© ${bot.user.username}`
                })
                .setThumbnail(member.displayAvatarURL({dynamic: true}));

                if(timestamp === 'oui') embed.setTimestamp();
                if(timestamp === 'non') return;

                db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, del) => {
                    let welcome = del[0].welcomeChannel;
                    const welcomeChannel = bot.channels.cache.get(welcome);
                    if(!bot.channels.cache.get(welcomeChannel)) return welcomeChannel.send({ content: `${member}`, embeds: [embed] });
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}