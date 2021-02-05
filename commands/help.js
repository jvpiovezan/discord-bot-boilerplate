const Discord = require('discord.js')
const paginationEmbed = require('discord.js-pagination')
const { prefix } = require('../config')
const { chunk } = require('../utils/arrayMethods')

module.exports = {
  name: 'ajuda',
  description: 'Lista todos os comandos e quando passado um comando como parâmetro, é descrevido o mesmo.',
  execute(message, arguments) {
    if (arguments.length) {
      const commandName = arguments[0]
      const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

      if (!command) return message.reply('***Não pude achar esse comando!***')

      const embed = new Discord.MessageEmbed()
        .setTitle(`Informações do comando ${command.name}:`)
        .setDescription(`**Para listar todos os comandos, dê o comando** \`${prefix}ajuda\``)
        .setColor(0x978cfa)

        if (command.description) embed.addField('Descrição:', command.description)
        if (command.aliases) embed.addField('Sinônimos', command.aliases.join(', '))
        if (command.usage) embed.addField('Uso:', `${prefix}${command.name} ${command.usage}`)
        embed.addField('Necessidade de parâmetros:', command.arguments ? 'Sim' : 'Não')

      return message.channel.send(embed)
    }

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