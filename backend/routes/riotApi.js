const express = require('express');
const axios = require('axios');
const { normalizeMatchDataById, normalizeRankedData, normalizeDatabaseMatchData, dbCommitStarter, commitMatches, normalizeDbDataForFrontend } = require('./helpers');
const router = express.Router();

const { Summoner, NormalRanking, Ranking, DoubleUpRanking, HyperRollRanking, Participant, Match, MatchParticipants, SummonerMatches, sequelize, Trait, Unit, ParticipantTrait, ParticipantUnit } = require('../db/models')

const axiosAmericas = axios.create({
  baseURL: "https://americas.api.riotgames.com",
  header: { "Access-Control-Allow_Origin" : "*"}
})

const axiosNA1 = axios.create({
  baseURL: "https://na1.api.riotgames.com/tft",
  header: { "Access-Control-Allow_Origin" : "*"}
})

router.get('/:summoner', async function(req, res, next) {
  const start = Date.now();
  const prelim = await Summoner.findOne({
    where: {
      id: req.params.summoner
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

  // if (await prelim) {
  //   const resData = normalizeDbDataForFrontend(prelim.toJSON())
  //   res.status(200).send(resData)
  //   return
  // }
  const datafromdb = await normalizeDbDataForFrontend(await prelim.toJSON())

  // console.log(datafromdb.matches[0].MatchParticipants[0].Participant.Units)

  let summoner;
  
  try {
    summoner = await axiosAmericas.get(`/riot/account/v1/accounts/by-riot-id/${req.params.summoner}/NA1?api_key=${process.env.RIOT_API_KEY}`)
    
  } catch(e) {
    console.log('here', e)
    res.status(404).send("Summoner not found")
    return
  }

  
  const summonerResolved = await summoner.data;

  const summonerInfo = await axiosNA1.get(`/summoner/v1/summoners/by-puuid/${summonerResolved.puuid}?api_key=${process.env.RIOT_API_KEY}`).then((e) => {
    return e.data
  }
  );
  // console.log( summonerInfo)

  summonerInfo.name = req.params.summoner

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
    time: (Date.now() - start)/1000 + " seconds",
    summoner: summonerInfo,
    matches: matches
  }
  // console.log(data)
  console.log("Response time: ", data.time)
  res.status(200).send(data)

  const backendTime = Date.now()

  const dbData = await Promise.all(rawMatchList.map( async (match) =>  normalizeDatabaseMatchData(match)))

  // console.log(data.summoner)
  dbCommitStarter(data).then(() => {
    commitMatches(dbData)
  })
  
  console.log('Total time: ', (Date.now() - start)/1000 + " seconds")
})

module.exports = router;