'use strict'
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

/**
 * register plugins server to get sequelize access
 * @param db, database name
 * @param options, sequelize options
 * @return {Promise<void>}
 */
module.exports = {
  name: 'sequelize',
  version: '1.0.0',
  register: async function (server, {
    db,
    options
  }) {
    const sequelizeOpts = {
      // default options, it can be override through options
      dialect: 'mysql',
      define: {
        timestamps: true, // by default created_at and updated_at
        freezeTableName: true, // disable plural table naming
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      },
      ...options
    }

    // Load Sequelize Models
    console.log(`[i] mysql connecting to: ${options.host}:${options.port}`)
    const sequelizeInstance = new Sequelize(sequelizeOpts)
    const models = {}
    fs.readdirSync(path.join(__dirname, '../../models/sequelize', db))
      .filter((model) => !model.startsWith('.') && model.endsWith('.js'))
      .forEach((model) => {
        const Model = require(path.join(__dirname, '../../models/sequelize', db, model))
        const modelInstance = Model(sequelizeInstance, Sequelize)
        const modelName = model.replace('.js', '')
        models[modelName] = modelInstance
      })
    Object.keys(models).forEach((model) => {
      if (models[model].associate) models[model].associate(models)
    })
    console.info(`[i] sequelize ${db} model loaded ${Object.keys(models).length}`)
    if (!server.plugins.sequelize) {
      server.plugins.sequelize = {}
    }
    server.plugins.sequelize[`${db}`] = models
    server.decorate('toolkit', `sequelize.${db}`, models)
  }
}
