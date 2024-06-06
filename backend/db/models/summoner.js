'use strict';
const { NormalRanking, DoubleUpRanking, HyperRollRanking } = require('./index');
console.log(NormalRanking, DoubleUpRanking, HyperRollRanking)
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
      // Summoner.hasOne(NormalRanking)
    }
  }
  Summoner.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Summoner',
  });
  return Summoner;
};