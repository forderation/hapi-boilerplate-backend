'use strict'
const TestWorker = require('../../../../workers/testWorker')

module.exports = async function (request, h) {
  const dbMysql = process.env.MYSQL_NAME
  const models = h[`sequelize.${dbMysql}`]
  // inject depedency models
  const testWorkerInstance = new TestWorker({
    models: models
  })
  const testInstance = await testWorkerInstance.addTest(request.payload)
  const response = h.objectResponse.genericResponse({
    message: 'successfully add test data',
    data: testInstance
  })
  return h.response(response)
}
