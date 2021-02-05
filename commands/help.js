const Discord = require('discord.js')
const paginationEmbed = require('discord.js-pagination')
const { prefix } = require('../config')
const { chunk } = require('../utils/arrayMethods')

module.exports = {
  name: 'ajuda',
  description: 'Lista todos os comandos e quando passado um comando como parâmetro, é descrevido o mesmo.',
  execute(message, arguments) {
    const commands = message.client.commands
    const commandList = [...commands.keys()].map(commandName => commands.get(commandName))
    const embeds = chunk(commandList, 3).map(chunk => {
      const embed = new Discord.MessageEmbed()
        .setTitle('Comandos:')
        .setDescription(`**Para mais informações, dê o comando** \`${prefix}ajuda [comando]\``)
        .setColor(0x978cfa)
      chunk.map(command => {
        embed
          .addField(command.name, command.description)
        })
      return embed
    })

    paginationEmbed(message, embeds, ['◀', '▶'], 15000)
  }
}