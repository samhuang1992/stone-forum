'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Stone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  Stone.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    date: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    party: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stone',
    tableName: 'Stones',
    underscored: true
  })
  return Stone
}
