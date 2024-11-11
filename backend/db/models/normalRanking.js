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
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    rank: DataTypes.STRING,
    leaguePoints: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    veteran: DataTypes.BOOLEAN,
    inactive: DataTypes.BOOLEAN,
    freshBlood: DataTypes.BOOLEAN,
    hotStreak: DataTypes.BOOLEAN
  }, {
    defaultScope: {
      attributes: [
        'id',
        'rank',
        'leaguePoints',
        'wins',
        'losses',
        'veteran',
        'inactive',
        'freshBlood',
        'hotStreak'
      ]
    },
    sequelize,
    modelName: 'NormalRanking',
    timestamps: false
  });
  return NormalRanking;
};

