'use strict'
const Logger = require('../../utils/logger')
const hapiSequelize = require('../db/hapiSequelize')
const hapiMongoose = require('../db/hapiMongoose')
const hapiResponse = require('../utils/hapiResponse')

async function initPlugins (server) {
  console.info('[i] server start to loading plugin')

  // hapi-response plugins
  await server.register({
    plugin: hapiResponse
  })

  /**
   * @description determine if an array contains one or more items from another array.
   * @param {array} haystack the array to search.
   * @param {array} arr the array providing items to check for in the haystack.
   * @param  {array} count minimum to true
   * @return {boolean} true|false if haystack contains at least {count} param item from arr.
   */
  const compareArray = (haystack, arr, count) => {
    let trueCount = 0
    arr.forEach(v => {
      const result = haystack.includes(v)
      if (result) {
        trueCount += 1
      }
    })
    return trueCount >= count
  }

  // 500 Internal error handler
  server.ext('onPreResponse', function (request, h) {
    const response = request.response
    if (!response.isBoom) {
      return h.continue
    }

    if (response?.output?.statusCode === 400) {
      const message = response?.output?.payload.message
      const validation = response?.output?.payload.validation
      return h.response(h.objectResponse.invalidRequest(message, validation)).code(400)
    }

    const checkResponse = Object.keys(response?.data || {})
    const target = ['code', 'message', 'data', 'error']
    if (compareArray(target, checkResponse, target.length)) {
      return h.response(response.data)
    }

    // Replace error with standard json error
    return h.response(h.objectResponse.errorResponse(request.response)).code(500)
  })

  server.events.on('request', (request, event, tags) => {
    if (tags.error) {
      const error = event.error ? event.error.message : 'unknown'
      const payload = request.payload || {}
      const logHeader = `[r] path: ${request.path} || method: ${request.method}`
      const logPayload = `[r] body: ${JSON.stringify(payload)}`
      const logResponse = `[r] response: ${error}`
      Logger.apiLogger('request').info(logHeader)
      Logger.apiLogger('request').info(logPayload)
      Logger.apiLogger('request').info(logResponse)
    }
  })

  // 404 Not found handler
  server.route({
    method: '*',
    path: '/{p*}',
    handler: function (request, h) {
      return h.response(h.objectResponse.notFoundResponse()).code(404)
    }
  })

  // Sequelize plugins
  await server.register({
    plugin: hapiSequelize,
    options: {
      options: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_NAME,
        logging: function (str) {
          // eslint-disable-next-line eqeqeq
          const log = Logger.mysqlLogger(process.env.MYSQL_NAME)
          log.info(str)
        }
      },
      db: process.env.MYSQL_NAME
    }
  })

  // Mongoose plugins
  let mongoCredential = ''
  if (process.env.MONGO_USER.length > 0) {
    mongoCredential = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
  }
  await server.register({
    plugin: hapiMongoose,
    options: {
      uri: `mongodb://${mongoCredential}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      db: process.env.MONGO_NAME
    }
  })

  server.events.on('response', function (request) {
    // do not logging not found and internal error here (internal error will be log in another event)
    if (request.response.source.code === 'INTERNAL_ERROR') {
      return
    }
    const payload = request.payload || {}
    const logHeader = `[r] path: ${request.path} || method: ${request.method}`
    const logPayload = `[r] body: ${JSON.stringify(payload)}`
    const logResponse = `[r] response: ${JSON.stringify(request.response.source)}`
    Logger.apiLogger('request').info(logHeader)
    Logger.apiLogger('request').info(logPayload)
    Logger.apiLogger('request').info(logResponse)
  })
  return server
}

module.exports = initPlugins
