const express = require('express');
const axios = require('axios');
const { normalizeMatchDataById, normalizeRankedData, normalizeDatabaseMatchData } = require('./helpers');
const router = express.Router();

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
  let summoner;
  // console.log('here')

  try {
    summoner = await axiosAmericas.get(`/riot/account/v1/accounts/by-riot-id/${req.params.summoner}/NA1?api_key=${process.env.RIOT_API_KEY}`)

  } catch(e) {
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

  fullInfoList.pop()
    return fullInfoList
  })

  const data = {
    time: (Date.now() - start)/1000 + " seconds",
    summoner: summonerInfo,
    matches: matches
  }
  console.log("Total time: ", data.time)
  res.status(200).send(data)

  normalizeDatabaseMatchData(rawMatchList.pop())
})

module.exports = router;