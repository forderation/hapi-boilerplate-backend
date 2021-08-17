'use strict'

module.exports = function (sequelize, DataTypes) {
  /**
   * Set paranoid to true if using soft delete
   * @type {*|ModelCtor<Model>|void}
   */
  const Schema = sequelize.define('testing_table',
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      key: {
        type: DataTypes.STRING(255)
      },
      value: {
        type: DataTypes.STRING(255)
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    },
    {
      paranoid: false
    }
  )

  /**
   * Write association here
   * @param models
   */
  Schema.associate = function (models) {
    // models.Category.hasMany(models.Product)
  }

  return Schema
}
