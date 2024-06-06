'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Summoner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Summoner.init({
    id: DataTypes.STRING,
    revisionDate: DataTypes.DATE,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Summoner',
  });
  return Summoner;
};