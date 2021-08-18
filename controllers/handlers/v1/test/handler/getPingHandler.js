'use strict'
const testService = require('../../../../services/test/testService')

module.exports = async function (request, h) {
  const testResponse = await testService.hitPingService({
    options: {
      baseURL: `http://${process.env.APP_HOST}:${process.env.APP_PORT}`
    },
    method: 'get'
  })
  const response = h.objectResponse.genericResponse({
    message: 'successfully hit test response',
    data: testResponse.data
  })
  return h.response(response)
}
