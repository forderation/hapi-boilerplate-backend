'use strict'
const hitter = require('../../../utils/axios')

/**
 * Just Testing to hit self service
 */

const config = {
  baseURL: `http://${process.env.APP_HOST}:${process.env.APP_PORT}`
}

/**
 * get hit ping service
 * @param payload if any
 * @param queryParam if any
 */
const hitPingService = async function ({
  payload,
  queryParam
}) {
  const hitterInstance = hitter(config)
  const response = await hitterInstance.get('/demo-unicoop/ping')
  return response?.data
}

module.exports = { hitPingService }
