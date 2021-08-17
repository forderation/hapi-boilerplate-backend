
const {
  createLogger,
  format,
  transports
} = require('winston')

const {
  combine,
  timestamp,
  label,
  printf
} = format
require('dotenv').config()

const isCurrentEnvDevelopment = process.env.ENV_MODE === 'development'

const fileFormat = printf(({
  level,
  message,
  label,
  timestamp
}) => {
  return `[i] ${timestamp} [${label}] ${level}: ${message}`
})

const consoleFormat = printf(({
  level,
  message,
  label,
  timestamp
}) => {
  const messages = (function () {
    if (isCurrentEnvDevelopment) {
      return message
    }
    return (message || '').substring(0, 500).concat(' more response can be seen on logfile')
  }())
  return `[i] ${timestamp} [${label}] ${level}: ${messages}`
})

const createTransport = function (filename, enableConsole) {
  const transporter = []
  if (enableConsole) {
    transporter.push(new transports.Console({
      format: consoleFormat
    }))
  }
  transporter.push(new transports.File({ filename }))
  return transporter
}

/**
 * Singleton patten initiator
 * We use this logger winston as core logging and debugging
 */
const Logger = (function () {
  let mySqlLoggerInstance
  let mongoLoggerInstance

  function createInstanceMysqlLogger (labelName) {
    return createLogger({
      transports: createTransport('logging_data/mysql.log', isCurrentEnvDevelopment),
      format: combine(
        label({ label: labelName }),
        timestamp(),
        fileFormat
      )
    })
  }

  function createInstanceApiLogger (labelName) {
    return createLogger({
      transports: createTransport('logging_data/api.log', isCurrentEnvDevelopment),
      format: combine(
        label({ label: labelName }),
        timestamp(),
        fileFormat
      )
    })
  }

  function createInstanceMongoLogger (labelName) {
    return createLogger({
      transports: createTransport('logging_data/mongo.log', isCurrentEnvDevelopment),
      format: combine(
        label({ label: labelName }),
        timestamp(),
        fileFormat
      )
    })
  }

  return {
    mysqlLogger (label) {
      if (!mySqlLoggerInstance) {
        mySqlLoggerInstance = createInstanceMysqlLogger(label)
      }
      return mySqlLoggerInstance
    },
    mongoLogger (label) {
      if (!mongoLoggerInstance) {
        mongoLoggerInstance = createInstanceMongoLogger(label)
      }
      return mongoLoggerInstance
    },
    apiLogger (label) {
      return createInstanceApiLogger(label)
    }
  }
})()

module.exports = Logger
