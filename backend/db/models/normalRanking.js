'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NormalRanking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NormalRanking.init({
    id: DataTypes.STRING,
    rank: DataTypes.STRING,
    leaguePoints: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    veteran: DataTypes.BOOLEAN,
    inactive: DataTypes.BOOLEAN,
    freshBlood: DataTypes.BOOLEAN,
    hotStreak: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'NormalRanking',
  });
  return NormalRanking;
};