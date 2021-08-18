'use strict'

/**
 * Class test repository
 * Repository is used if any long query or transaction
 * inject workers if any on params constructor
 */
class TestRepository {
  constructor ({ worker, objectResponse }) {
    this._worker = worker
    this._objectResponse = objectResponse
  }

  async getTestById (idTest) {
    const tests = await this._worker.getTest({
      where: {
        id: idTest
      }
    })
    if (tests.length < 1) {
      throw this._objectResponse.genericResponse({
        message: 'data test not found',
        error: true,
        code: 'DATA_NOT_FOUND'
      })
    }
    return tests
  }

  async getTestLogByKey (key) {
    const tests = await this._worker.getTestLog({
      key: key
    })
    if (tests.length < 1) {
      throw this._objectResponse.genericResponse({
        message: 'data test log not found',
        error: true,
        code: 'DATA_NOT_FOUND'
      })
    }
    return tests
  }

  async removeTestById (id) {
    const tests = await this._worker.getTest({
      where: {
        id: id
      }
    })
    if (tests.length < 1) {
      throw this._objectResponse.genericResponse({
        message: 'data test not found',
        error: true,
        code: 'DATA_NOT_FOUND'
      })
    }
    await this._worker.removeTest({
      where: {
        id: id
      }
    })
  }
}

module.exports = TestRepository
