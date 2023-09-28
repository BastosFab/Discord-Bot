const ascii = require('ascii-table');
const fs = require('fs');
const table = new ascii().setHeading('Commands', 'Status');

module.exports = async bot => {
    let commandsArray = [];

    const commandsFolder = fs.readdirSync('./Commands');
    for (const folder of commandsFolder) {
        const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`);

            // if(!commandFile.name || typeof commandFile.name !== 'string') throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de nom ou n'est pas une chaîne de caractères`);

            bot.commands.set(commandFile.name, commandFile);
            
            table.addRow(file, '✅');
            continue;
        }
    }
    return console.log(table.toString(), '\n Loaded Commands !\n');
}