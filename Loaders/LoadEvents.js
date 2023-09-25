const fs = require('fs');

module.exports = async bot => {
    fs.readdirSync('./Events').filter(file => file.endsWith('.js')).forEach( async file => {
        let event = require(`../Events/${file}`);
        bot.on(file.split('.js').join(''), event.bind(null, bot));
        console.log(`\x1b[32mSUCCESS - EVENT - ${file.split('.js').join('')}\x1b[32m`);
    })
}