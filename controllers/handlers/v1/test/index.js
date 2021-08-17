const getTestHandler = require('./getTestHandler')
const addTestHandler = require('./addTestHandler')
const removeTestHandler = require('./removeTestHandler')
const addTestLogHandler = require('./addTestLogHandler')
const getTestLogHandler = require('./getTestLogHandler')
const getPingHandler = require('./getPingHandler')
const validator = require('./validator')

module.exports = {
  name: 'testPlugin',
  version: '1.0.0',
  register: async function (server, options) {
    const prefix = options.prefix || ''
    const localPrefix = 'test'
    server.route({
      method: 'POST',
      path: `${prefix}/${localPrefix}/mysql/get`,
      handler: getTestHandler,
      options: {
        validate: {
          payload: validator.getTest
        }
      }
    })
    server.route({
      method: 'POST',
      path: `${prefix}/${localPrefix}/mysql/add`,
      handler: addTestHandler,
      options: {
        validate: {
          payload: validator.addTest
        }
      }
    })
    server.route({
      method: 'POST',
      path: `${prefix}/${localPrefix}/mysql/remove`,
      handler: removeTestHandler,
      options: {
        validate: {
          payload: validator.getTest
        }
      }
    })
    server.route({
      method: 'POST',
      path: `${prefix}/${localPrefix}/mongo/add`,
      handler: addTestLogHandler,
      options: {
        validate: {
          payload: validator.addTest
        }
      }
    })
    server.route({
      method: 'POST',
      path: `${prefix}/${localPrefix}/mongo/get`,
      handler: getTestLogHandler,
      options: {
        validate: {
          payload: validator.getTestLog
        }
      }
    })
    server.route({
      method: 'GET',
      path: `${prefix}/${localPrefix}/ping`,
      handler: getPingHandler
    })
    // etc ... another method or route
  }
}
