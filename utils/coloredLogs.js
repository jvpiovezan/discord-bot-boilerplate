const chalk = require('chalk')

function logSuccess(text) {
  if (!text) return console.error('You need to pass a text parameter!')
  console.log(chalk.green('[Success]'), text)
}

function logError(text) {
  if (!text) return console.error('You need to pass a text parameter!')
  console.log(chalk.red('[Error]'), text)
}

module.exports = {
  logSuccess,
  logError
}