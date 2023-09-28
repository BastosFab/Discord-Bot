module.exports = async (prefix) => {

    let characters = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];
    let id = [];
    for (let i = 0; i < 10; i++) {
        id.push(characters[Math.floor(Math.random() * characters.length)]);
    }

    return `${prefix}-${id.join('')}`;	
}