'use strict'
const testWorker = require('../../../workers/testWorker')
const StandardResponse = require('../../../../utils/response')

module.exports = async function (request, h) {
  const testInstance = await testWorker.getTestLogWorker(h, {
    key: request.payload.key
  })
  if (testInstance.length < 1) {
    return h.response(StandardResponse.genericResponse({
      message: 'data test log not found',
      error: true,
      code: 'DATA_NOT_FOUND'
    }))
  }
  const response = StandardResponse.genericResponse({
    message: 'successfully get test data',
    data: testInstance
  })
  return h.response(response)
}
