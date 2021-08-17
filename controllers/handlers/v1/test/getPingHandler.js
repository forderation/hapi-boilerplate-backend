'use strict'
const testService = require('../../../services/test/testService')
const StandardResponse = require('../../../../utils/response')

module.exports = async function (request, h) {
  const testResponse = await testService.hitPingService({})
  const response = StandardResponse.genericResponse({
    message: 'successfully hit test response',
    data: testResponse.data
  })
  return h.response(response)
}
