'use strict'
const StandardResponse = require('../../utils/response')

/**
 * Standard unicoop service response
 * @return {Promise<void>}
 */
module.exports = {
  name: 'hapi-response',
  version: '1.0.0',
  register: async function (server, options) {
    console.info('[i] loading hapi-response plugins')
    server.decorate('toolkit', 'objectResponse', StandardResponse)
  }
}
