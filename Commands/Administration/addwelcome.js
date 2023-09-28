const Discord = require('discord.js');

module.exports = {
    name:"addwelcome",
    description: "Permet d'ahouter un message de bienvenu au serveur",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [],

    async run(bot, message, args, db) {

        const embedId = new Discord.EmbedBuilder()
        .setDescription("Veuillez entrer l'id du salon de bienvenue ⬇️")

        db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, request) => {
            if(request.length < 1) {
                message.reply({content: 'Désolé, mais vous n\'avez pas encore enregistré le serveur en bdd', ephemeral: true});
            } else {
                message.reply({ embeds: [embedId], ephemeral: true }).then(() => {
                    let filter = m => m.author.id === message.user.id;
                    const collector = message.channel.createMessageCollector({ filter, max: 1 });
          
                    collector.on('collect', (msg) => {
          
                        let channel = msg.content;
                        setTimeout(() => {
                            bot.channels.fetch(msg.channelId).then(channel => {
                            channel.messages.delete(msg.id);
                            });
                        }, 2000);
          
                        db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {
            
                            db.query(`UPDATE server SET welcomeChannel = '${channel}' WHERE guild = '${message.guild.id}'`);
                        });
          
                        db.query(`SELECT * FROM welcome WHERE guild_id = '${message.guild.id}'`, async (err, req) => {
          
                            db.query(`INSERT INTO welcome (guild_id, title, description, footer, timestamp, image) VALUES (${message.guild.id}, "aucun",  "aucun", "aucun", "aucun", "aucun")`)
            
                            // message.reply({
                            // content: "Vous avez bien activé les message de bienvenue !",
                            // ephemeral: true
                            // });
                        });
                    });
                });
            }
        });
    }
}