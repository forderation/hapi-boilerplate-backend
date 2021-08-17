'use strict'
const test = require('./test')

module.exports = async function (server, prefix = '') {
  await server.register([
    {
      plugin: test,
      options: {
        prefix: `${prefix}/v1`
      }
    }
  ])
  return server
}
