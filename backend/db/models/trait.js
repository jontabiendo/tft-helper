'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trait extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trait.belongsToMany(models.Participant, {
        through: models.ParticipantTrait,
        foreignKey: "traitId"
      })
    }
  }
  Trait.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    tier_total: DataTypes.INTEGER,
    tier_current: DataTypes.INTEGER,
    style: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trait',
    timestamps: false
  });
  return Trait;
};