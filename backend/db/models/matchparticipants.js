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
        foreignKey: 'participant'
      })
      MatchParticipants.hasMany(models.participant, {
        foreignKey: 'id'
      })
    }
  }
  MatchParticipants.init({
    matchId: DataTypes.STRING,
    participant: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MatchParticipants',
    timestamps: false
  });
  return MatchParticipants;
};