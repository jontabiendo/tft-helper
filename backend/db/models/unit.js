'use strict';
const {
  Model
} = require('sequelize');
const participant = require('./participant');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Unit.belongsToMany(models.Participant, {
        through: models.ParticipantUnit
      })
    }
  }
  Unit.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    tier: DataTypes.INTEGER,
    rarity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Unit',
    timestamps: false
  });
  return Unit;
};