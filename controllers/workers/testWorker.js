'use strict'

/**
 * set your worker to related db name here
 */
const mysqldb = process.env.MYSQL_NAME
const mongodb = process.env.MONGO_NAME

const addTestWorker = async (h, value) => {
  const models = h[`sequelize.${mysqldb}`]
  return models.testModel.create(value)
}

const getTestWorker = async (h, query) => {
  const models = h[`sequelize.${mysqldb}`]
  return models.testModel.findAll(query)
}

const removeTestWorker = async (h, query) => {
  const models = h[`sequelize.${mysqldb}`]
  return models.testModel.destroy(query)
}

const addTestLogWorker = async (h, value) => {
  const collections = h[`mongoose.${mongodb}`]
  return collections.testSchema.create(value)
}

const getTestLogWorker = async (h, query) => {
  const collections = h[`mongoose.${mongodb}`]
  return collections.testSchema.find(query)
}

module.exports = {
  addTestWorker,
  getTestWorker,
  removeTestWorker,
  addTestLogWorker,
  getTestLogWorker
}
