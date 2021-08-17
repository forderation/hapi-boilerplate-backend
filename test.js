'use strict'

const Code = require('@hapi/code')
const Lab = require('@hapi/lab')
const { expect } = Code
const lab = exports.lab = Lab.script()
const InitServer = require('./core/server/hapiCompilerServer')

/**
 ROUTE LIST
 [r] route: * 127.0.0.1:8080/{p*}
 [r] route: get 127.0.0.1:8080/demo-unicoop/error
 [r] route: get 127.0.0.1:8080/demo-unicoop/ping
 [r] route: get 127.0.0.1:8080/demo-unicoop/v1/test/ping
 [r] route: post 127.0.0.1:8080/demo-unicoop/v1/test/mongo/add
 [r] route: post 127.0.0.1:8080/demo-unicoop/v1/test/mongo/get
 [r] route: post 127.0.0.1:8080/demo-unicoop/v1/test/mysql/add
 [r] route: post 127.0.0.1:8080/demo-unicoop/v1/test/mysql/get
 [r] route: post 127.0.0.1:8080/demo-unicoop/v1/test/mysql/remove
 */

lab.experiment('test server are ok == ', () => {
  let server
  lab.before(async () => {
    server = await InitServer()
    await server.start()
  })

  const expectNormalCase = (res) => {
    expect(res.statusCode).to.equal(200)
    lab.it('it should contain standard response', () => {
      expect(res.result.code).to.equal('00')
      expect(res.result.message).to.equal(String)
      expect(res.result.error).to.equal(false)
      expect(res.result.data).to.exist()
    })
  }

  lab.test('test ping route', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/demo-unicoop/ping'
    })
    expectNormalCase(res)
  })

  lab.test('test error route', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/demo-unicoop/error'
    })
    expect(res.statusCode).to.equal(500)
    lab.it('it should contain standard response', () => {
      expect(res.result.code).to.equal('INTERNAL_ERROR')
      expect(res.result.error).to.equal(true)
      expect(res.result.data).to.exist()
    })
  })

  lab.test('test service proxy ping', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/demo-unicoop/v1/test/ping'
    })
    expectNormalCase(res)
  })

  lab.test('test mongo service add', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/demo-unicoop/v1/test/mongo/add',
      payload: {
        key: 'test lab key mongo',
        value: 'test lab value mongo'
      }
    })
    expectNormalCase(res)
  })

  lab.test('test mysql service add', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/demo-unicoop/v1/test/mysql/add',
      payload: {
        key: 'test lab key mysql',
        value: 'test lab value mysql'
      }
    })
    expectNormalCase(res)
  })

  lab.test('test mongo get', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/demo-unicoop/v1/test/mongo/get',
      payload: {
        key: 'test key'
      }
    })
    expectNormalCase(res)
  })

  lab.test('test mysql get not found', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/demo-unicoop/v1/test/mysql/get',
      payload: {
        id: 1
      }
    })
    expect(res.statusCode).to.equal(200)
    lab.it('it should contain standard response', () => {
      expect(res.result.code).to.equal('DATA_NOT_FOUND')
      expect(res.result.error).to.equal(true)
      expect(res.result.data).to.exist()
      expect(res.result.message).equal(String)
    })
  })

  lab.test('test validator joi work', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/demo-unicoop/v1/test/mysql/add',
      payload: {}
    })
    expect(res.statusCode).to.equal(400)
    lab.it('it should contain standard response', () => {
      expect(res.result.code).to.equal('INVALID_REQUEST')
      expect(res.result.error).to.equal(true)
      expect(res.result.data).to.exist()
      expect(res.result.message).equal(String)
    })
  })
})
