'use strict'

/**
 * Class test worker, inject your models and collections if any on params constructor
 */
class TestWorker {
  constructor ({ models, collections }) {
    this._models = models
    this._collections = collections
  }

  get models () {
    return this._models
  }

  get collections () {
    return this._collections
  }

  async addTest (value) {
    return await this._models.testModel.create(value)
  }

  async getTest (query) {
    return await this._models.testModel.findAll(query)
  }

  async removeTest (query) {
    return await this._models.testModel.destroy(query)
  }

  async addTestLog (value) {
    return await this._collections.testSchema.create(value)
  }

  async getTestLog (query) {
    return await this._collections.testSchema.find(query)
  }
}

module.exports = TestWorker
