'use strict';
// console.log(NormalRanking, DoubleUpRanking, HyperRollRanking)
const {
  Model
} = require('sequelize');
const summonermatches = require('./summonermatches');
module.exports = (sequelize, DataTypes) => {
  class Summoner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Summoner.hasOne(models.Ranking, {
        foreignKey: 'summonerId'
      })
      Summoner.hasMany(models.Participant, {
        foreignKey: 'summonerId',
      })
      // Summoner.hasMany(models.SummonerMatches, {
      //   foreignKey: 'summonerId'
      // })
      Summoner.belongsToMany(models.Match, {
        through: models.SummonerMatches,
      })
    }
  }
  Summoner.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    level: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Summoner',
    timestamps: false
  });
  return Summoner;
};