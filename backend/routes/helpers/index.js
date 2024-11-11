const traits = require('./traitLinks')
const { Op } = require('sequelize')

const { Summoner, NormalRanking, Ranking, DoubleUpRanking, HyperRollRanking, Match, Participant } = require('../../db/models');

function assignTraitLinks(traitsList) {
  traitsList.forEach(trait => {
    trait.link = traits.traits[`${trait.name}`]
  });

  return traitsList
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
    // console.log(queue)
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
  // console.log(matchData)
  matchData.id = matchData.metadata.match_id
  matchData.patch = Number(matchData.info.game_version.slice(-6, matchData.info.game_version.length - 1))
  
  delete matchData.metadata
  delete matchData.info.endOfGameResult
  delete matchData.info.gameCreation
  delete matchData.info.gameId
  delete matchData.info.game_datetime
  delete matchData.info.game_length
  delete matchData.info.mapId
  delete matchData.info.tft_set_core_name
  delete matchData.info.queue_id
  delete matchData.info.game_version

  matchData = {...matchData, ...matchData.info}
  delete matchData.info
  // console.log(matchData)

  matchData.participants = await Promise.all(matchData.participants.map(match => normalizeParticipantData(match)))
  
  return matchData
}

async function dbCommitStarter(data) {
  console.log('Starting commit to db...')
  console.log(data.summoner.rankings)

  let summoner = await Summoner.findOne({
    where: {
      id: data.summoner.name
    }
  })
  if (summoner) {
    summoner.level = data.summoner.summonerLevel,
    summoner.updatedAt = new Date(data.summoner.revisionDate)

    Object.keys(data.summoner.rankings).forEach(async (rank) => {
      console.log('rank: ', rank)
      let key;
      if (rank === 'RANKED_TFT') {
        key = NormalRanking
      } else if (rank === 'RANKED_TFT_DOUBLE_UP') {
        key = DoubleUpRanking
      } else {
        key = HyperRollRanking
      }
      console.log(key)

      
      let rankEntry = await key.findOne({
        where: {
          id: data.summoner.name
        }
      })

      console.log('1st instance: ', rankEntry)
      
      if (rankEntry) {
        for (const row of Object.keys(data.summoner.rankings[rank])) {
          rankEntry[row] = data.summoner.rankings[rank][row]
        }
      } else {
        rankEntry = await key.create({
          id: data.summoner.name,
          ...data.summoner.rankings[rank]
        })
      }

      console.log('rankEntry: ', rankEntry)
      rankEntry.save()
    })
  } else {
    summoner = await Summoner.create({
      id: data.summoner.name,
      level: data.summoner.summonerLevel,
      updatedAt: new Date(data.summoner.revisionDate)
    })
  }

  summoner.save()

}

module.exports = {
  normalizeMatchDataById,
  normalizeRankedData,
  normalizeDatabaseMatchData,
  dbCommitStarter
}