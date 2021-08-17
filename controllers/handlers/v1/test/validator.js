const Joi = require('joi')

const addTest = Joi.object({
  key: Joi.string().required(),
  value: Joi.string().required()
})

const getTest = Joi.object({
  id: Joi.number().required()
})

const getTestLog = Joi.object({
  key: Joi.string().required()
})

module.exports = {
  addTest,
  getTest,
  getTestLog
}
