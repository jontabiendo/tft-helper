function normalizeMatchData(match, id){
  let relevantInfo = match.filter(player => player.puuid === id)[0]

  delete relevantInfo.companion
  delete relevantInfo.missions
  delete relevantInfo.time_eliminated
  delete relevantInfo.puuid

  relevantInfo.traits = relevantInfo.traits.filter(trait => trait.tier_current > 0).sort((a, b) => {
    if (a.style> b.style) {
      return - 1
    } else if (a.style < b.style) {
      return 1
    } else {
      return 0
    }
  })

  relevantInfo.units = relevantInfo.units.sort((a, b) => {
    if (a.tier > b.tier) {
      return -1
    } else if (a.tier < b.tier) {
      return 1
    } else if (a.rarity > b.rarity) {
      return -1
    } else if (a.rarity < b.rarity) {
      return 1
    } else {
      return 0
    }
  })
  
  return relevantInfo
}

module.exports = {
  normalizeMatchData
}