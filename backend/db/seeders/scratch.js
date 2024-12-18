const unique = ["TFT13_HighRoller", "TFT13_JunkerKing", "TFT13_Teamup_Geniuses", "TFT13_Teamup_UnlikelyDuo"];
const twoPoint = ["TFT13_Ambassador", "TFT13_FormSwapper"];
const threePoint = ["TFT13_Hoverboard", "TFT13_Watcher", "TFT13_Hextech", "TFT13_Sniper", "TFT13_Titan", "TFT13_Bruiser", "TFT13_Martialist", "TFT13_Experiment", "TFT13_Infused", "TFT13_Challenger"];
const fourPoint = ["TFT13_Ambusher", "TFT13_Rebel", "TFT13_Scrap", "TFT13_Academy", "TFT13_Invoker", "TFT13_Family", "TFT13_Pugilist", "TFT13_Warband", "TFT13_Cabal", "TFT13_Sorcerer"];
const fivePoint = ["TFT13_Squad"]

const allTraits = [unique, twoPoint, threePoint, fourPoint, fivePoint];

for (let i = 0; i < allTraits.length; i++) {
    console.log(allTraits[i].length)
    const tierTraits = [];

    for (let j = 0; j < allTraits[i].length; j++) {
        const name = allTraits[i][j];
        let trait = [];

        for (let k = 0; k <= i; k++) {
          let style;
  
          if (i === 0) {
            style = 3
          } else if (i === 4 && k === 4) {
            style = 5
          } else if ((i === k) || ((i - k === 1) || (i - k === 2)) && i === 4) {
            style = 4
          } else if (((k + 1)/(i + 1)) >= 0.5) {
            style = 2
          } else {
            style = 1
          }
  
          const tier = {
            name,
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

console.log(allTraits.flat(Infinity))

// console.log(1/4)