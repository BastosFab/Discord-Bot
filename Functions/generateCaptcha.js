const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = async (bot, guild) => {

    let characters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'];
    let text = [];

    for(let i = 0; i < 6; i++) text.push(characters[Math.floor(Math.random() * characters.length)]);
    text = text.join('');

    const canvas = Canvas.createCanvas(300, 150);
    const ctx = canvas.getContext('2d');

    ctx.font = '75px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, (150 - (ctx.measureText(text).width) / 2), 85);

    return {canvas: canvas, text: text}
}