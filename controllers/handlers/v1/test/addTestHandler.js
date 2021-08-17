'use strict'
const testWorker = require('../../../workers/testWorker')
const StandardResponse = require('../../../../utils/response')

module.exports = async function (request, h) {
  const testInstance = await testWorker.addTestWorker(h, request.payload)
  const response = StandardResponse.genericResponse({
    message: 'successfully add test data',
    data: testInstance
  })
  return h.response(response)
}
