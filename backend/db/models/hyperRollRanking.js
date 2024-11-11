'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HyperRollRanking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HyperRollRanking.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    ratedTier: DataTypes.STRING,
    ratedRating: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER
  }, {
    defaultScope: {
      attributes: [
        'id',
        'ratedTier',
        'ratedRating',
        'wins',
        'losses'
      ]
    },
    sequelize,
    modelName: 'HyperRollRanking',
    timestamps: false
  });
  return HyperRollRanking;
};