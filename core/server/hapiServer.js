'use strict'
const Hapi = require('@hapi/hapi')
const initPlugins = require('./hapiPlugins')
/**
 * Singleton patten initiator
 * We use this server as core base Hapi server
 */
const Server = (function () {
  let instance

  async function createInstance () {
    const server = Hapi.server({
      host: process.env.APP_HOST,
      port: process.env.APP_PORT,
      routes: {
        cors: {
          origin: ['*']
        },
        validate: {
          failAction: async (request, h, err) => {
            throw err
          }
        }
      },
      debug: process.env.ENV_MODE === 'development'
        ? {
            request: ['error'],
            log: ['*']
          }
        : undefined
    })
    return await initPlugins(server)
  }

  return {
    /**
     * Get server instance if not initiate then will be automatically create new instance
     */
    getInstance: function () {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()

module.exports = Server
