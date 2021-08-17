'use strict'
const testWorker = require('../../../workers/testWorker')
const StandardResponse = require('../../../../utils/response')

module.exports = async function (request, h) {
  const id = request.payload.id
  const tests = await testWorker.getTestWorker(h, {
    where: {
      id: id
    }
  })
  if (tests.length < 1) {
    return h.response(StandardResponse.genericResponse({
      message: 'data test not found',
      error: true,
      code: 'DATA_NOT_FOUND'
    }))
  }
  await testWorker.removeTestWorker({
    where: {
      id: id
    }
  })
  return h.response(StandardResponse.genericResponse({
    message: 'successfully remove data',
    data: null
  }))
}
