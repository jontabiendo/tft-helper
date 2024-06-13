'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert("Participants", [
    {
      goldLeft: 1,
      lastRound: 24,
      level: 10,
      placement: 1,
      playersEliminated: 1,
      totalDamageToPlayers: 32,
      augments: "TFT11_Augment_DragonlordCrest,TFT7_Augment_BandOfThieves1,TFT11_Augment_HeavenlyCrest",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 4,
      lastRound: 23,
      level: 10,
      placement: 2,
      playersEliminated: 2,
      totalDamageToPlayers: 26,
      augments: "TFT11_Augment_WanderingTrainerGold,TFT9_Augment_PandorasRadiantBox,TFT9_Augment_JeweledLotus",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 3,
      lastRound: 22,
      level: 10,
      placement: 3,
      playersEliminated: 1,
      totalDamageToPlayers: 26,
      augments: "TFT11_Augment_Invoker,TFT9_Augment_HealingOrbsI,TFT11_Augment_Reinfourcement",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 2,
      lastRound: 23,
      level: 10,
      placement: 2,
      playersEliminated: 1,
      totalDamageToPlayers: 30,
      augments: "TFT9_Augment_Commander_Ascension,TFT11_Augment_AltruistCrown,TFT10_Augment_CrashTestDummies",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 2,
      lastRound: 22,
      level: 10,
      placement: 3,
      playersEliminated: 1,
      totalDamageToPlayers: 26,
      augments: "TFT7_Augment_BestFriends1,TFT11_Augment_GoldenRemover,TFT11_Augment_RadiantRefactor",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 9,
      lastRound: 13,
      level: 7,
      placement: 8,
      playersEliminated: 0,
      totalDamageToPlayers: 0,
      augments: "TFT9_Augment_WanderingTrainer,TFT9_Augment_PandorasItems2,TFT9_Augment_OldMansWalkingStick",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 3,
      lastRound: 20,
      level: 9,
      placement: 5,
      playersEliminated: 0,
      totalDamageToPlayers: 18,
      augments: "TFT11_Augment_ArcanistCrown,TFT6_Augment_GachaAddict,TFT11_Augment_PorcelainCrown",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 3,
      lastRound: 23,
      level: 10,
      placement: 3,
      playersEliminated: 1,
      totalDamageToPlayers: 32,
      augments: "TFT7_Augment_BestFriends2,TFT7_Augment_BestFriends1,TFT11_Augment_DryadCrest",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 11,
      lastRound: 35,
      level: 9,
      placement: 4,
      playersEliminated: 0,
      totalDamageToPlayers: 121,
      augments: "TFT11_Augment_Trickshot,TFT9_Augment_SupportCache,TFT11_Augment_DynamicDuo",
      summonerId: "WaterS0lid"
    },
    {
      goldLeft: 0,
      lastRound: 28,
      level: 8,
      placement: 7,
      playersEliminated: 0,
      totalDamageToPlayers: 63,
      augments: "TFT10_Augment_GoingLong,TFT6_Augment_ForceOfNature,TFT6_Augment_TheGoldenEgg",
      summonerId: "WaterS0lid"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Participants", null, {})
  }
};
