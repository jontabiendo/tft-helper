'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MatchParticipants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MatchParticipants.belongsTo(models.Match, {
        foreignKey: 'matchId'
      })
      MatchParticipants.hasOne(models.Participant, {
        foreignKey: "id"
      })
    }
  }
  MatchParticipants.init({
    matchId: DataTypes.STRING,
    participantId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MatchParticipants',
    timestamps: false
  });
  return MatchParticipants;
};