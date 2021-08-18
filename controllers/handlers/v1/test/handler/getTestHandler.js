'use strict'
const TestRepository = require('../repositories/testRepository')
const TestWorker = require('../../../../workers/testWorker')

module.exports = async function (request, h) {
  const id = request.payload.id
  const mongoDb = process.env.MONGO_NAME
  const dbMysql = process.env.MYSQL_NAME
  const collections = h[`mongoose.${mongoDb}`]
  const models = h[`sequelize.${dbMysql}`]
  const testWorkerInstance = new TestWorker({ models, collections })
  const testRepositoryInstance = new TestRepository({
    worker: testWorkerInstance,
    objectResponse: h.objectResponse
  })
  const tests = await testRepositoryInstance.getTestById(id)
  return h.response(h.objectResponse.genericResponse({
    message: 'data test found',
    data: tests
  }))
}
