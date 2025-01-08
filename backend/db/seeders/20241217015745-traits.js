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
    const unique = ["TFT13_HighRoller", "TFT13_JunkerKing", "TFT13_Teamup_Geniuses", "TFT13_Teamup_UnlikelyDuo", "tft13_machineherald", "tft13_missmagetrait", "tft13_bloodhunter", "tft13_teamup_reunion", "tft13_teamup_sisters", "tft13_teamup_mentorship", "tft13_teamup_menaces"];
    const twoPoint = ["TFT13_Ambassador", "TFT13_FormSwapper"];
    const threePoint = ["TFT13_Hoverboard", "TFT13_Watcher", "TFT13_Hextech", "TFT13_Sniper", "TFT13_Titan", "TFT13_Bruiser", "TFT13_Martialist", "TFT13_Experiment", "TFT13_Infused", "TFT13_Challenger", "TFT13_Family"];
    const fourPoint = ["TFT13_Ambusher", "TFT13_Rebel", "TFT13_Scrap", "TFT13_Academy", "TFT13_Invoker", "TFT13_Family", "TFT13_Pugilist", "TFT13_Warband", "TFT13_Cabal", "TFT13_Sorcerer"];
    const fivePoint = ["TFT13_Squad", "tft13_crime"]

    const allTraits = [unique, twoPoint, threePoint, fourPoint, fivePoint];

    for (let i = 0; i < allTraits.length; i++) {
      const tierTraits = [];

      for (let j = 0; j < allTraits[i].length; j++) {
        const name = allTraits[i][j];
        let trait = [];

        for (let k = 0; k <= i; k++) {
          let style;

          function checkMatch(num) {
            return num === ((k+1)/(i+1))
          }
    
          if (i === 0) {
            style = 3
          } else if (i === 4 && k === 4) {
            style = 5
          } else if ([3/5, 0.75, 0.8, 1.0].some(checkMatch)) {
            style = 4
          } else if (i !== 1 && [0.4, 0.5, 2/3].some(checkMatch)) {
            style = 2
          } else {
            style = 1
          }
    
          const tier = {
            name: name.toLocaleLowerCase(),
            tier_total: i + 1,
            tier_current: k + 1,
            style
          }

          trait.push(tier)
        }
        tierTraits.push(trait)
      }
      allTraits[i] = tierTraits
    }

    return queryInterface.bulkInsert("Traits", allTraits.flat(Infinity))
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Traits", null, {})
  }
};
