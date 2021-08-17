'use strict'
const axios = require('axios')

module.exports = function ({
  baseURL,
  timeout
}) {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: timeout || parseInt(process.env.SERVICE_TIMEOUT || 10000)
  })

  instance.interceptors.request.use((config) => {
    if (process.env.ENV_MODE === 'development') {
      console.info(`[i] service start hit to ${config.baseURL + config.url}`)
    }
    return config
  }, (error) => Promise.reject(error))

  instance.interceptors.response.use((response) => {
    if (response.data.error) {
      if (process.env.ENV_MODE === 'development') {
        console.info(`[!] service got abnormal case message: ${response.data.message}}`)
      }
      return Promise.reject(response.data.message)
    }
    return response
  }, (error) => {
    if (process.env.ENV_MODE === 'development') {
      console.info(`[!] service got error ${error}. code: ${error?.response?.status || 'internal error'}`)
    }
    return Promise.reject(error)
  })

  return instance
}
