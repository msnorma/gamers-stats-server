import moment from 'moment'

export default class Logger {
  static log = (args1 = null, args2 = null) => {
    process.stdout.write(`[ ${moment().format('YYYY-MM-DD HH:mm:ss')} ]: `)

    if (args2) console.log(args1, args2)
    else console.log(args1)
  }

  static error = (args1 = null, args2 = null) => {
    process.stdout.write(`[ ${moment().format('YYYY-MM-DD HH:mm:ss')} ]: `)

    if (args2) console.error(args1, args2)
    else console.error(args1)
  }
}