'use strict'
const TestWorker = require('../../../../workers/testWorker')
const TestRepository = require('../repositories/testRepository')

module.exports = async function (request, h) {
  const mongoDb = process.env.MONGO_NAME
  const dbMysql = process.env.MYSQL_NAME
  const collections = h[`mongoose.${mongoDb}`]
  const models = h[`sequelize.${dbMysql}`]
  const testWorkerInstance = new TestWorker({ models, collections })
  const testRepositoryInstance = new TestRepository({
    worker: testWorkerInstance,
    objectResponse: h.objectResponse
  })
  const tests = await testRepositoryInstance.getTestLogByKey(request.payload.key)
  const response = h.objectResponse.genericResponse({
    message: 'successfully get test data',
    data: tests
  })
  return h.response(response)
}
