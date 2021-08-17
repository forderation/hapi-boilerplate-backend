'use strict'

/**
 * Define Collection's Model
 *
 * @param {*} mongoose mongoose Connection
 * @returns {Object} return Mongoose Model Object
 */
const Collection = (mongoose) => {
  const { Schema } = mongoose
  const MainSchema = new Schema(
    {
      key: String,
      value: String
    },
    {
      minimize: false,
      timestamps: {
        createdAt: true,
        updatedAt: false
      }
    }
  )

  return mongoose.model('tests', MainSchema)
}

module.exports = Collection
