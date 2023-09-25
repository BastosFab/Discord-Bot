const Discord = require('discord.js');

module.exports = async (bot, interaction) => {

    const ownerId = '199629311911788544';

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused();

        if (interaction.commandName === 'help') {
            let choices = bot.commands.filter(cmd => cmd.name.includes(entry));
            await interaction.respond(entry === '' ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commands/${interaction.commandName}`);

        if (command.ownerOnly && interaction.user.id !== ownerId) return interaction.reply({content: 'Seul le développeur du bot peut utiliser cette comande !', ephemeral: true});
        command.run(bot, interaction, interaction.options);
    }
}