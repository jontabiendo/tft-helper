'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trait extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trait.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    tierTotal: DataTypes.INTEGER,
    tierCurrent: DataTypes.INTEGER,
    style: DataTypes.INTEGER,
    numUnits: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trait',
  });
  return Trait;
};