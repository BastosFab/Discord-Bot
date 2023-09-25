const fs = require('fs');

module.exports = async bot => {
    fs.readdirSync('./Commands').filter(file => file.endsWith('.js')).forEach( async file => {
        let command = require(`../Commands/${file}`);
        if(!command.name || typeof command.name !== 'string') throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de nom ou n'est pas une chaîne de caractères`);
        bot.commands.set(command.name, command);
        console.log(`\x1b[32mSUCCESS - COMMAND - ${command.name}\x1b[32m`);
    })
}