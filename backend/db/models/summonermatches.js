'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SummonerMatches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SummonerMatches.belongsTo(models.Summoner, {
        foreignKey: "id"
      })
      SummonerMatches.belongsTo(models.Match, {
        foreignKey: "id"
      })
    }
  }
  SummonerMatches.init({
    matchId: DataTypes.INTEGER,
    summonerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SummonerMatches',
    timestamps: false
  });
  return SummonerMatches;
};