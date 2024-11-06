'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.hasOne(models.MatchParticipants, {
        foreignKey: 'matchId'
      })
      Match.hasMany(models.SummonerMatches, {
        foreignKey: 'matchId',
      })
    }
  }
  Match.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    tft_set: DataTypes.INTEGER,
    game_type: DataTypes.STRING,
    queue_id: DataTypes.INTEGER,
    set_core_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
    timestamps: false
  });
  return Match;
};