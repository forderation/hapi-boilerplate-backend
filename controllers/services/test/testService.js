'use strict'
const hitter = require('../../../utils/axios')

/**
 * hit ping service
 * @param {*} param0 {options: options axios, payload: payload body if any, method: method http request}
 * @returns
 */

const hitPingService = async function ({ options, payload = {}, method = '' }) {
  const hitterInstance = hitter(options)
  const response = await hitterInstance[method.toLowerCase()]('/demo-unicoop/ping')
  return response?.data
}

module.exports = { hitPingService }
