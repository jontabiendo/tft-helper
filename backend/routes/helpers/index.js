const traits = require('./traitLinks')
const units = require("./unitLinks")
const { Op } = require('sequelize')

const { Summoner, NormalRanking, Ranking, DoubleUpRanking, HyperRollRanking, Match, MatchParticipants, participant, SummonerMatches, Unit, Trait } = require('../../db/models');

function assignTraitLinks(traitsList) {
  traitsList.forEach(trait => {
    trait.link = traits.traits[`${trait.name}`]
  });

  return traitsList
}

function assignUnitLinks(unitList) {
  unitList.map(unit => {
    unit.link = units.units[`${unit.character_id}`]
  })

  return unitList
}

function normalizeMatchDataById(match, id, queueId){
  relevantInfo = match.filter(player => player.puuid === id)[0]

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

  relevantInfo.traits = assignTraitLinks(relevantInfo.traits)
  relevantInfo.units = assignUnitLinks(relevantInfo.units)

  relevantInfo.units = relevantInfo.units.sort((a, b) => {
    if (a.itemNames.length > b.itemNames.length) {
      return -1
    } else if (a.itemNames.length < b.itemNames.length) {
      return 1
    } else if (a.tier > b.tier) {
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

  relevantInfo['queueId'] = queueId

  return relevantInfo
}

function normalizeRankedData(rankings) {
  const res = {};

  for (const queue of rankings) {
    if (queue.rank) {
      queue.rank = queue.tier + " " + queue.rank
    }
    
    res[queue.queueType] = queue

    delete queue.tier
    delete queue.queueType
    delete queue.puuid
    delete queue.leagueId
    delete queue.summonerId
  }

  return res
}

function normalizeParticipantData(participant) {
  delete participant.companion
  delete participant.missions
  delete participant.time_eliminated
  // delete participant.puuid

  participant.traits = participant.traits.filter(trait => trait.tier_current > 0).sort((a, b) => {
    if (a.style> b.style) {
      return - 1
    } else if (a.style < b.style) {
      return 1
    } else {
      return 0
    }
  })

  participant.units = participant.units.sort((a, b) => {
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
  
  return participant
}

async function normalizeDatabaseMatchData(matchData) {
  matchData.id = matchData.metadata.match_id
  matchData.patch = Number(matchData.info.game_version.slice(-6, matchData.info.game_version.length - 1))
  
  delete matchData.metadata
  delete matchData.info.endOfGameResult
  delete matchData.info.gameCreation
  delete matchData.info.gameId
  delete matchData.info.game_length
  delete matchData.info.mapId
  delete matchData.info.tft_set_core_name
  delete matchData.info.queue_id
  delete matchData.info.game_version

  matchData = {...matchData, ...matchData.info}
  delete matchData.info

  matchData.participants = await Promise.all(matchData.participants.map(match => normalizeParticipantData(match)))
  
  return matchData
}

async function dbCommitStarter(data) {
  // console.log('Starting commit to db...')
  // console.log(data.summoner.rankings)

  let summoner = await Summoner.findOne({
    where: {
      id: data.summoner.name.toLowerCase()
    }
  })
  console.log(summoner)
  if (summoner) {
    summoner.level = data.summoner.summonerLevel,
    summoner.updatedAt = new Date(data.summoner.revisionDate)

    Object.keys(data.summoner.rankings).forEach(async (rank) => {
      let key;
      if (rank === 'RANKED_TFT') {
        key = NormalRanking
      } else if (rank === 'RANKED_TFT_DOUBLE_UP') {
        key = DoubleUpRanking
      } else {
        key = HyperRollRanking
      }

      let rankEntry = await key.findOne({
        where: {
          id: data.summoner.name.toLowerCase()
        }
      })
      
      if (rankEntry) {

        for (const row of Object.keys(data.summoner.rankings[rank])) {
          // console.log(row, data.summoner.rankings[rank][row])
          rankEntry[row] = data.summoner.rankings[rank][row]
        }
      } else {
        rankEntry = await key.create({
          id: data.summoner.name.toLowerCase(),
          ...data.summoner.rankings[rank]
        })
      }
      rankEntry.save()
    })
  } else {
    summoner = await Summoner.create({
      id: data.summoner.name.toLowerCase(),
      level: data.summoner.summonerLevel,
      updatedAt: new Date(data.summoner.revisionDate)
    })

    const ranking = await Ranking.create({
      summonerId: data.summoner.name.toLowerCase(),
      doubleUpRanking: data.summoner.name.toLowerCase(),
      normalRanking: data.summoner.name.toLowerCase(),
      hyperRollRanking: data.summoner.name.toLowerCase()
    })
    ranking.save()

    let promiseRes = Object.keys(data.summoner.rankings).forEach(async (rank) => {
      let key;
      let keyString;
      if (rank === 'RANKED_TFT') {
        key = NormalRanking
        keyString = "normalRanking"
      } else if (rank === 'RANKED_TFT_DOUBLE_UP') {
        key = DoubleUpRanking
        keyString = 'doubleUpRanking'
      } else {
        key = HyperRollRanking
        keyString = 'hyperRollRanking'
      }

      let entry =  await key.create({
        id: data.summoner.name.toLowerCase(),
        ...data.summoner.rankings[rank]
      })
      entry.save()
    })
  }

  summoner.save()
}

async function commitUnit(u) {
    const newU = await Unit.findOrCreate({
      where: {
        name: u.character_id,
        rarity: u.rarity,
        tier: u.tier
      },
      defaults: {
        name: u.character_id,
        rarity: u.rarity,
        tier: u.tier
      }
    })

    // console.log("new Unit: ", await newU)

    return await newU
}

async function commitMatches(matches) {
  console.log("STARTING MATCHES COMMIT")
  for (const match of matches) {
    let dbMatch = await Match.findOne({
      where: {
        id: match.id
      }
    })

    if (!dbMatch) {
      const newMatch = await Match.create({
        id: match.id,
        tft_set: match.tft_set_number,
        game_type: match.tft_game_type,
        queue_id: match.queueId,
        set_core_name: "INTO THE ARCANE",
        createdAt: match.game_datetime
      })
      console.log(await newMatch)
      for (const matchParticipant of match.participants) {
        const newParticipant = await participant.create({
          goldLeft: matchParticipant.gold_left,
          lastRound: matchParticipant.last_round,
          level: matchParticipant.level,
          placement: matchParticipant.placement,
          playersEliminated: matchParticipant.players_eliminated,
          totalDamageToPlayers: matchParticipant.total_damage_to_players,
          summonerId: (matchParticipant.riotIdGameName).toLowerCase(),
        })

        await commitParticipantUnits(matchParticipant.units)

        const newMP = await MatchParticipants.create({
          matchId: match.id,
          participant: await newParticipant.id,
          createdAt: new Date(match.game_datetime)
        })

        const newSM = await SummonerMatches.create({
          matchId: match.id,
          summonerId: (matchParticipant.riotIdGameName).toLowerCase(),
          createdAt: new Date(match.game_datetime)
        })
      }
    }
  }
}

module.exports = {
  normalizeMatchDataById,
  normalizeRankedData,
  normalizeDatabaseMatchData,
  dbCommitStarter,
  commitMatches
}