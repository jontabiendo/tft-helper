'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.belongsTo(models.MatchParticipants, {
        foreignKey: 'id'
      })
      Participant.belongsTo(models.Summoner, {
        foreignKey: 'id'
      })
    }
  }
  Participant.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    goldLeft: DataTypes.INTEGER,
    lastRound: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    placement: DataTypes.INTEGER,
    playersEliminated: DataTypes.INTEGER,
    totalDamageToPlayers: DataTypes.INTEGER,
    summonerId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'participant',
    timestamps: false
  });
  return Participant;
};