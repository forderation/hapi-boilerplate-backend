'use strict'
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const Logger = require('../../utils/logger')

/**
 * register plugins server to get mongoose access
 * @param uri, dsn to connect mongo
 * @param db, mongo database name
 * @param options, mongoose options
 * @return {Promise<void>}
 */
module.exports = {
  name: 'mongoose',
  version: '1.0.0',
  register: async function (server, {
    uri,
    db,
    options
  }) {
    console.info(`[i] mongo connecting to ${uri}`)
    await mongoose.connect(uri, options)
    mongoose.set('debug', function (coll, method, query, doc) {
      const log = Logger.mongoLogger(db)
      log.info(`mongoose coll: ${JSON.stringify(coll)} - method: ${JSON.stringify(method)}  - query: ${JSON.stringify(query)}`)
    })
    const collections = {}
    fs.readdirSync(path.join(__dirname, '../../models/mongoose', db))
      .filter((collection) => !collection.startsWith('.') && collection.endsWith('.js'))
      .forEach((collection) => {
        const Collection = require(path.join(__dirname, '../../models/mongoose', db, collection))
        const collectionName = collection.replace('.js', '')
        collections[collectionName] = Collection(mongoose)
      })
    console.info(`[i] mongoose ${db} collection loaded ${Object.keys(collections).length}`)
    if (!server.plugins.mongoose) {
      server.plugins.mongoose = {}
    }
    server.plugins.mongoose[`${db}`] = collections
    server.decorate('toolkit', `mongoose.${db}`, collections)
  }
}
