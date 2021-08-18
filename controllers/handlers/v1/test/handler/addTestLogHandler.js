'use strict'
const TestWorker = require('../../../../workers/testWorker')

module.exports = async function (request, h) {
  const mongoDb = process.env.MONGO_NAME
  const collections = h[`mongoose.${mongoDb}`]
  // iniate worker instance
  const testWorkerInstance = new TestWorker({
    collections: collections // inject collections depedency
  })
  const testInstance = await testWorkerInstance.addTestLog(request.payload)
  const response = h.objectResponse.genericResponse({
    message: 'successfully add test data',
    data: testInstance
  })
  return h.response(response)
}
