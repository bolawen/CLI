const chalk = require('chalk')
const logSymbols = require("log-symbols");
const format = require('util').format

const prefix = '   bolawen-cli'
const sep = chalk.gray('·')

exports.log = function (...args) {
  const msg = format.apply(format, args)
  console.log(logSymbols.warning,chalk.white(prefix), sep, msg)
}

exports.fatal = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(logSymbols.error,chalk.red(prefix), sep, msg)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

exports.success = function (...args) {
  const msg = format.apply(format, args)
//   console.log(logSymbols.success,chalk.white(prefix), sep, msg)
  console.log(logSymbols.success,chalk.white(prefix), sep, msg)
}
