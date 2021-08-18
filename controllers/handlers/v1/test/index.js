const getTestHandler = require('./handler/getTestHandler')
const addTestHandler = require('./handler/addTestHandler')
const removeTestHandler = require('./handler/removeTestHandler')
const addTestLogHandler = require('./handler/addTestLogHandler')
const getTestLogHandler = require('./handler/getTestLogHandler')
const getPingHandler = require('./handler/getPingHandler')
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
