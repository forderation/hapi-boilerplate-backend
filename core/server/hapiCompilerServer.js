'use strict'
const Server = require('./hapiServer')
const v1Handler = require('../../controllers/handlers/v1')
const StandardResponse = require('../../utils/response')
require('dotenv').config()

/**
 * Compiler server integrate with other plugins and external route if any
 * @return {Promise<void>}
 */
module.exports = async () => {
  const appPrefixPath = process.env.APP_PATH !== '' ? `/${process.env.APP_PATH}` : ''
  let server = await Server.getInstance()
  /**
   * Example route service
   */
  server.route({
    method: 'GET',
    path: `${appPrefixPath}/ping`,
    handler: function (req, h) {
      return h.response(StandardResponse.genericResponse({
        message: 'pong'
      }))
    }
  })

  /**
   * Example error internal
   */
  server.route({
    method: 'GET',
    path: `${appPrefixPath}/error`,
    handler: function (req, h) {
      return new Error('testing error')
    }
  })

  /**
   * Call register outside plugins here
   */
  server = await v1Handler(server, appPrefixPath)

  return server
}
