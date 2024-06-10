const express = require('express');
const axios = require('axios');
const { normalizeMatchData, normalizeRankedData } = require('./helpers');
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
  // console.log("*")
  // console.log("*")
  // console.log("*")
  // console.log("fetcing puuid: ", req.params.summoner, process.env.RIOT_API_KEY)
  // console.log("*")
  // console.log("*")
  // console.log("*")
  const summoner = await axiosAmericas.get(`/riot/account/v1/accounts/by-riot-id/${req.params.summoner}/NA1?api_key=${process.env.RIOT_API_KEY}`)

  // console.log("*")
  // console.log("*")
  // console.log("*")
  // console.log("resolving puuidd")
  // console.log("*")
  // console.log("*")
  // console.log("*")

  const summonerResolved = await summoner.data;

  // console.log("*")
  // console.log("*")
  // console.log("*")
  // console.log("fetchign summoner info", summonerResolved)
  // console.log("*")
  // console.log("*")
  // console.log("*")
  
  const summonerInfo = await axiosNA1.get(`/summoner/v1/summoners/by-puuid/${summonerResolved.puuid}?api_key=${process.env.RIOT_API_KEY}`).then((e) => {
    // console.log(typeof e.data.revisionDate)
    return e.data
  }
  );
  // console.log("*")
  // console.log("*")
  // console.log("*")
  // console.log("summoner info received: ", summonerInfo)
  // console.log("*")
  // console.log("*")
  // console.log("*")

  // const rankedInfo = await axiosNA1.get(`/league/v1/entries/by-summoner/${summonerInfo.data.id}?api_key=${process.env.RIOT_API_KEY}`)

  // summonerInfo.data.rankings = normalizeRankedData(rankedInfo.data)

  // console.log("*")
  // console.log("*")
  // console.log("*")
  // console.log("ranked info received: ", rankedInfo.data)
  // console.log("*")
  // console.log("*")
  // console.log("*")

  const count = 10
  const matches = await axiosAmericas.get(`/tft/match/v1/matches/by-puuid/${summonerResolved.puuid}/ids?count=${count}&api_key=${process.env.RIOT_API_KEY}`)
  .then(async e => {
    const fullInfoList = await Promise.all(
      [...e.data.map(async match => {
        // console.log("match: ", match)
        const res = await axiosAmericas.get(`/tft/match/v1/matches/${match}?api_key=${process.env.RIOT_API_KEY}`)

        relevantInfo = normalizeMatchData(res.data.info.participants, summonerResolved.puuid)

        return relevantInfo
    }), (async () => {
      const rankedInfo = await axiosNA1.get(`/league/v1/entries/by-summoner/${summonerInfo.id}?api_key=${process.env.RIOT_API_KEY}`)

      // console.log(summonerInfo)
      summonerInfo.rankings = normalizeRankedData(rankedInfo.data)

      return summonerInfo.rankings
    })()
  ])

    // console.log('fullInfoList: ', fullInfoList)
    fullInfoList.pop()
    return fullInfoList
  })

  console.log(summonerInfo)
  const data = {
    time: (Date.now() - start)/1000 + " seconds",
    summoner: summonerInfo,
    matches: matches
  }
  console.log("Total time: ", data.time)
  // console.log(data)
  res.status(200).send(data)
})

module.exports = router;