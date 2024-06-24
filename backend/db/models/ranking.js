'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ranking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ranking.belongsTo(models.Summoner, {
        foreignKey: 'rankings'
      })
      Ranking.hasOne(models.NormalRanking, {
        foreignKey: 'id'
      })
      Ranking.hasOne(models.HyperRollRanking, {
        foreignKey: 'id'
      })
      Ranking.hasOne(models.DoubleUpRanking, {
        foreignKey: 'id'
      })
    }
  }
  Ranking.init({
    summonerId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      references: { 
        model: "Summoner",
        key: "id"
      }
    },
    doubleUpRanking: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { 
        model: "DoubleUpRanking",
        key: 'id'
      }
    },
    hyperRollRanking: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { 
        model: "HyperRollRanking",
        key: 'id'
      }
    },
    normalRanking: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { 
        model: "NormalRanking",
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Ranking',
  });
  return Ranking;
};