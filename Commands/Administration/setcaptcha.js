const Discord = require('discord.js');

module.exports = {
    name: 'setcaptcha',
    description: 'Paramétrer le captcha',
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: 'Administration',
    ownerOnly: false,
    options: [
        {
            type: 'string',
            name: 'état',
            description: 'État du captcha (on / off)',
            required: true,
            autocomplete: true
        },
        {
            type: 'channel',
            name: 'salon',
            description: 'Salon de vérification (si le captcha est activé)',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let state = args.getString('état');
        if(state !== 'on' && state !== 'off') return message.reply({content: 'Veuillez entrer un état valide (on / off)', ephemeral: true});

        if(state === 'off') {

            db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guild.id}'`);
            await message.reply({content: 'Le captcha a bien été désactivé !', ephemeral: true});
        } else {

            let channel = args.getChannel('salon');
            if(!channel) return message.reply({content: 'Veuillez entrer un salon pour activer le captcha', ephemeral: true});

            channel = message.guild.channels.cache.get(channel.id);
            if(!channel) return message.reply({content: 'Veuillez entrer un salon valide', ephemeral: true});
            
            db.query(`UPDATE server SET captcha = ${channel.id} WHERE guild = '${message.guild.id}'`);
            await message.reply({content: `Le captcha a bien été activé sur le salon ${channel} !`, ephemeral: true});
        }
    }
}