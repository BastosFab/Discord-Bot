// const fs = require('fs');

// module.exports = async bot => {
//     fs.readdirSync('./Events').filter(file => file.endsWith('.js')).forEach( async file => {
//         let event = require(`../Events/${file}`);
//         bot.on(file.split('.js').join(''), event.bind(null, bot));
//         console.log(`\x1b[32mSUCCESS - EVENT - ${file.split('.js').join('')}\x1b[32m`);
//     })
// }

const ascii = require('ascii-table');
const fs = require('fs');
const table = new ascii().setHeading('Events', 'Status');

module.exports = async bot => {
    const folders = fs.readdirSync('./Events');
    for (const folder of folders) {
        const files = fs.readdirSync(`./Events/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const event = require(`../Events/${folder}/${file}`);
            
            bot.on(file.split('.js').join(''), event.bind(null, bot));
            table.addRow(file, '✅');
            continue;
        }

    }
    return console.log(table.toString(), '\n Loaded Events !\n');
}