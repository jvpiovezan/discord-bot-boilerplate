module.exports = {
  name: 'ping',
  description: 'Retorna `Pong!` para o usuário.',
  execute(message) {
    message.channel.send('***Pong!***')
  }
}