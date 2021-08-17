'use strict'
const InitServer = require('./core/server/hapiCompilerServer')
require('dotenv').config()

const init = async () => {
  const server = await InitServer()
  /**
   * Start server
   */
  const host = `${server?.info.host}:${server?.info.port}`
  server?.table().forEach((route) => console.log(`\t [r] route: ${route.method} ${host + route.path}`))
  await server?.start()
  console.log(`[*] server successfully running on ${server?.info.host}:${server?.info.port}`)
}

process.on('unhandleRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init().then(() => {
  console.log(`[i] application ${process.env.APP_NAME} start successfully`)
})
