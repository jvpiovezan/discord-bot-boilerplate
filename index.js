const { prefix, token } = require('./config')

const Discord = require('discord.js')
const fs = require('fs')
const { logSuccess, logError } = require('./utils/coloredLogs')

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.clear()
  logSuccess(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return

  const messageArray = message.content.slice(prefix.length).split(/ +/)
  const commandName = messageArray[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const arguments = messageArray.slice(1)

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) return

  if (command.guildOnly && message.channel.type == 'dm') {
    return message.channel.send(`${message.author}***, Eu não posso executar esse comando no privado!***`)
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author)
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.channel.send(`${message.author}***, Você não tem permissão para executar este comando!***`)
    }
  }

  if (command.arguments && !arguments.length) {
    let reply = `***Você não passou parâmetros,*** ${message.author}!`

    if (command.usage) {
      reply += `\n***O uso apropriado do comando é:*** \`${prefix}${command.name} ${command.usage}\``
    }

    return message.channel.send(reply)
  }

  try {
    command.execute(message, arguments)
  } catch(error) {
    logError(error)
    message.channel.send(`${message.author}***, Houve um erro ao executar esse comando!***`)
  }
})

client.login(token)