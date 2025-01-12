const axios = require('axios')
const { newTraits : traitLinks} = require('./traitLinks')
const { newUnits : unitLinks} = require("./unitLinks")
const { Op } = require('sequelize')

const { Summoner, NormalRanking, Ranking, DoubleUpRanking, HyperRollRanking, Match, MatchParticipants, Participant, SummonerMatches, Unit, Trait, ParticipantUnit, ParticipantTrait } = require('../../db/models');

async function getSummonerFromDb(name) {
  const prelim = await Summoner.findOne({
    where: {
      id: name
    },
    include: [
      {
        model: Ranking,
        include: [
          {
            model: NormalRanking
          },
          {
            model: DoubleUpRanking
          },
          {
            model: HyperRollRanking
          }
        ]
      },
      {
        model: Match,
        through: {
          attributes: []
        },
        // order: [
        //   ['id', 'ASC']
        // ],
        include: [
          {
            model: MatchParticipants,
            // through: {
              attributes: ['id'],
            // },
            include: [
              {
                model: Participant,
                include:[
                  {
                    model: Trait,
                    through: {
                      attributes: []
                    }
                  },
                  {
                    model: Unit,
                    through: {
                      attributes: []
                    }
                  }
                ]
              }
              ]
          }
        ]
      }
    ]
  })
  // console.log(await prelim.toJSON().Matches)

  return prelim    
}

const axiosAmericas = axios.create({
  baseURL: "https://americas.api.riotgames.com",
  header: { "Access-Control-Allow_Origin" : "*"}
})

const axiosNA1 = axios.create({
  baseURL: "https://na1.api.riotgames.com/tft",
  header: { "Access-Control-Allow_Origin" : "*"}
})

async function getSummonerFromRGAPI(name) {
  let summoner;
  
  try {
    summoner = await axiosAmericas.get(`/riot/account/v1/accounts/by-riot-id/${name}/NA1?api_key=${process.env.RIOT_API_KEY}`)
    
  } catch(e) {
    throw new Error("Summoner not found")
  }

  
  const summonerResolved = await summoner.data;

  const summonerInfo = await axiosNA1.get(`/summoner/v1/summoners/by-puuid/${summonerResolved.puuid}?api_key=${process.env.RIOT_API_KEY}`).then((e) => {
    return e.data
  }
  );
  // console.log( summonerInfo)

  summonerInfo.name = name

  const count = 5;
  const rawMatchList = Array(count);
  const matches = await axiosAmericas.get(`/tft/match/v1/matches/by-puuid/${summonerResolved.puuid}/ids?count=${count}&api_key=${process.env.RIOT_API_KEY}`)
  .then(async e => {
    const fullInfoList = await Promise.all(
      [...e.data.map(async (match, idx) => {
        const res = await axiosAmericas.get(`/tft/match/v1/matches/${match}?api_key=${process.env.RIOT_API_KEY}`)
        
        relevantInfo = normalizeMatchDataById(res.data.info.participants, summonerResolved.puuid, res.data.info.queueId)
        // idx === 0 ? console.log(relevantInfo) : null
        
        rawMatchList[idx] = (res.data)

        return relevantInfo
    }), (async () => {
      const rankedInfo = await axiosNA1.get(`/league/v1/entries/by-summoner/${summonerInfo.id}?api_key=${process.env.RIOT_API_KEY}`)

      summonerInfo.rankings = normalizeRankedData(rankedInfo.data)

      return summonerInfo.rankings
    })()
  ])

  // console.log(await matches)

  fullInfoList.pop()
    return fullInfoList
  })

  const data = {
    summoner: summonerInfo,
    matches: matches
  }
  return {
    data,
    rawMatchList
  }
}

function assignTraitLinks(traitsList) {
  traitsList.forEach(trait => {
    trait.link = traitLinks[`${trait.name.toLowerCase()}`]
  });

  return traitsList
}

function assignUnitLinks(unitList) {
  unitList.map(unit => {
    unit.link = unitLinks[`${unit.character_id.toLowerCase()}`]
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
    if (a.style === 3 || (a.style !== 3 && a.style > b.style)) {
      return - 1
    } else if ((a.style < b.style && b.style !== 3) || b.style === 3) {
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
  console.log('Starting commit to db...')
  // console.log(data.summoner.rankings)
  // console.log(data)

  let summoner = await Summoner.findOne({
    where: {
      id: data.summoner.name.toLowerCase()
    }
  })
  // console.log(summoner)
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
      updatedAt: Date.now()
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

async function commitUnit(unit, participantId) {
  // console.log(unit)
  if (unit.character_id.toLowerCase() === "tft13_jaycesummon") {
    return
  }
  
    const unitEntry = await Unit.findOne({
      where: {
        name: unit.character_id.toLowerCase(),
        rarity: unit.rarity,
        tier: unit.tier
      }
    })
    const newUnitEntry = await ParticipantUnit.create({
      participantId: participantId,
      unitId: await unitEntry.id
    })
    // console.log(unit, unitEntry)
  
  
    await newUnitEntry.save()
  
    // console.log("new Unit: ", await newUnitEntry)
  
    return await newUnitEntry

}

async function commitParticipantUnits(units, participantId) {
  return await Promise.all([...units.map(async (unit) => {
    return await commitUnit(unit, participantId)
  })])
}

async function commitTrait(trait, participantId) {
  const traitEntry = await Trait.findOne({
    where: {
      name: trait.name.toLowerCase(),
      tier_total: trait.tier_total,
      tier_current: trait.tier_current,
    }
  })
  // console.log(trait, traitEntry)

  const newTraitEntry = await ParticipantTrait.create({
    participantId: participantId,
    traitId: await traitEntry.id
  })

  await newTraitEntry.save()

  // console.log(newTraitEntry)

  // console.log("new Unit: ", await newU)

  return await newTraitEntry
}

async function commitParticipantTraits(traits, participantId) {
  // return [...traits.map(async (trait) => {
  //   return await commitTrait(trait, participantId)
  // })]
  return await Promise.all([...traits.map(async (trait) => {
    // console.log(trait)
    return await commitTrait(trait, participantId)
  })])
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
      // console.log(await newMatch)
      let newParticipant
      for (const matchParticipant of match.participants) {
        newParticipant = await Participant.create({
          goldLeft: matchParticipant.gold_left,
          lastRound: matchParticipant.last_round,
          level: matchParticipant.level,
          placement: matchParticipant.placement,
          playersEliminated: matchParticipant.players_eliminated,
          totalDamageToPlayers: matchParticipant.total_damage_to_players,
          summonerId: (matchParticipant.riotIdGameName).toLowerCase(),
        })

        const unitsCommit = await commitParticipantUnits(matchParticipant.units, await newParticipant.id)

        const traitsCommit = await commitParticipantTraits(matchParticipant.traits, await newParticipant.id)

        const newMP = await MatchParticipants.create({
          matchId: match.id,
          participantId: await newParticipant.id,
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

async function normalizeDbDataForFrontend(data) {
  const res = {
    summoner: {
      name: data.id,
      summonerLevel: data.level,
      revisionDate: new Date(data.updatedAt),
      rankings: {
        RANKED_TFT: data.Ranking.NormalRanking ? data.Ranking.NormalRanking : null,
        RANKED_TFT_DOUBLE_UP: data.Ranking.DoubleUpRanking ? data.Ranking.DoubleUpRanking : null,
        RANKED_TFT_TURBO: data.Ranking.HyperRollRanking ? data.Ranking.HyperRollRanking : null
      }
    },
    matches: []
  }
  // console.log(data)

  for (const match of data.Matches) {
    console.log("matchParticipants: ", match.MatchParticipants)
    const newMatch = {
      game_type: match.game_type,
      tft_set: match.tft_set
    }
    // console.log(match.MatchParticipants, data.id)

    const relevantData = match.MatchParticipants.find(p => {
      return p.Participant.summonerId.toLowerCase() === data.id.toLowerCase()
    })
    console.log("data: ", relevantData)

    newMatch.gold_left = relevantData.Participant.goldLeft
    newMatch.last_round = relevantData.Participant.lastRound
    newMatch.level = relevantData.Participant.level
    newMatch.placement = relevantData.Participant.placement
    newMatch.players_eliminated = relevantData.Participant.playersEliminated
    newMatch.traits = []
    newMatch.units = []

    // console.log(part)
    for (const trait of relevantData.Participant.Traits) {
      const newTrait = {
        name: trait.name,
        style: trait.style,
        tier_current: trait.tier_current,
        tier_total: trait.tier_total,
        link: traitLinks[trait.name.toLowerCase()]
      }

      newMatch.traits.push(newTrait)
    }

    for (const unit of relevantData.Participant.Units) {
      // console.log(unit)
      const newUnit = {
        character_id: unit.name,
        name:"",
        rarity: unit.rarity,
        tier: unit.tier,
        link: unitLinks[unit.name.toLowerCase()]
      }

      newMatch.units.push(newUnit)
    }

    
    res.matches.push(newMatch)

  }
  // console.log("RES HERE: ", res.matches[0])

  return res
}

module.exports = {
  normalizeMatchDataById,
  normalizeRankedData,
  normalizeDatabaseMatchData,
  dbCommitStarter,
  commitMatches,
  normalizeDbDataForFrontend,
  getSummonerFromDb,
  getSummonerFromRGAPI
}