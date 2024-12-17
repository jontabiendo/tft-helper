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
    const oneCosts = ["TFT13_Amumu", "TFT13_Darius", "TFT13_Powder", "TFT13_Morgana", "TFT13_Singed", "TFT13_Vex", "TFT13_Irelia", "TFT13_Red", "TFT13_Fish", "TFT13_Shooter", "TFT13_Trundle", "TFT13_Trundle", "TFT13_Draven", "TFT13_Blue", "TFT13_Lux", "TFT13_Zyra"];
    const twoCosts = ["TFT13_Prime", "TFT13_RenataGlasc", "TFT13_Vladimir", "TFT13_Rell", "TFT13_Sett", "TFT13_Nocturne", "TFT13_Akali", "TFT13_Urgot", "TFT13_Zeri", "TFT13_Camille", "TFT13_Leona", "TFT13_Tristana", "TFT13_Ziggs", ];
    const threeCosts = ["TFT13_Gangplank", "TFT13_NunuWillump", "TFT13_Chainsaw", "TFT13_Nami", "TFT13_TwistedFate", "TFT13_Ezreal", "TFT13_Swain", "tft13_swain", "TFT13_Ambessa", "TFT13_Beardy", "TFT13_FlyGuy", "TFT13_Cassiopeia", "TFT13_Blitzcrank", "TFT13_KogMaw", "TFT13_Gremlin"];
    const fourCosts = ["TFT13_Garen", "TFT13_Vi", "TFT13_Heimerdinger", "TFT13_Illaoi", "TFT13_Ekko", "TFT13_Zoe", "TFT13_Twitch", "TFT13_DrMundo", "TFT13_Elise", "tft13_elise", "TFT13_Corki", "TFT13_Silco"];
    const fiveCosts = ["TFT13_Lieutenant", "TFT13_Jinx", "TFT13_Sion", "TFT13_Rumble", "TFT13_Caitlyn", "TFT13_Jayce", "TFT13_LeBlanc", "TFT13_Malzahar", "TFT13_Mordekaiser", ];
    const sixCosts = ["TFT13_Warwick", "TFT13_MissMage", "TFT13_Viktor"];
    
    const allUnits = [oneCosts, twoCosts, threeCosts, fourCosts, fiveCosts, sixCosts];
    
    for (let i = 0; i < allUnits.length; i++) {
        const tierUnits = []
      for (let k = 0; k < allUnits[i].length; k++) {
        const name = allUnits[i][k]
        let unit = []
        let rarity;
        
        if (i === 5) {
            rarity = 8
        } else if (i === 4) {
            rarity = 6
        } else if (i === 3) {
            rarity = 4
        } else {
            rarity = i
        }
    
        for (let j = 1; j < 5; j++) {
          unit.push(
            {
              name,
              tier: j,
              rarity
            }
          )
        }
    
        tierUnits.push(unit)
      }
      allUnits[i] = tierUnits
    }

    return queryInterface.bulkInsert('Units', allUnits.flat(Infinity))
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Units", null, {})
  }
};
