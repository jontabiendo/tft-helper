'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Unit.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    itemNames: DataTypes.STRING,
    tier: DataTypes.INTEGER,
    rarity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Unit',
    timestamps: false
  });
  return Unit;
};