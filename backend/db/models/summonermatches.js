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
      // // define association here
      // SummonerMatches.belongsTo(models.Summoner, {
      //   foreignKey: "id"
      // })
      // SummonerMatches.belongsTo(models.Match, {
      //   foreignKey: "id"
      // })
    }
  }
  SummonerMatches.init({
    matchId: {
      type: DataTypes.STRING,
      references: {
        model: "Matches",
        key: 'id'
      }
    },
    summonerId: {
      type: DataTypes.STRING,
      references: {
        model: "Summoner",
        key: 'id'
      }
    },
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SummonerMatches',
    timestamps: false
  });
  return SummonerMatches;
};