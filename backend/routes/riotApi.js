var express = require('express');
const axios = require('axios');
const { normalizeData } = require('./helpers');
var router = express.Router();

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
  console.log("*")
  console.log("*")
  console.log("*")
  console.log("fetcing puuid: ", req.params.summoner)
  console.log("*")
  console.log("*")
  console.log("*")
  const puuid = await axiosAmericas.get(`/riot/account/v1/accounts/by-riot-id/${req.params.summoner}/NA1?api_key=RGAPI-c6af43e3-1c68-486e-a552-85f7226571a4`)

  // console.log("*")
  // console.log("*")
  // console.log("*")
  // console.log("resolving puuidd")
  // console.log("*")
  // console.log("*")
  // console.log("*")

  const puuidResolved = await puuid.data.puuid;

  // console.log("*")
  // console.log("*")
  // console.log("*")
  console.log("fetchign summoner info", puuidResolved)
  // console.log("*")
  // console.log("*")
  // console.log("*")
  
  const summonerInfo = await axiosNA1.get(`/summoner/v1/summoners/by-puuid/${puuidResolved}?api_key=RGAPI-c6af43e3-1c68-486e-a552-85f7226571a4`);
  // console.log("*")
  // console.log("*")
  // console.log("*")
  // console.log("summoner info received")
  // console.log("*")
  // console.log("*")
  // console.log("*")
  const count = 10
  const matches = await axiosAmericas.get(`/tft/match/v1/matches/by-puuid/${puuidResolved}/ids?count=${count}&api_key=RGAPI-c6af43e3-1c68-486e-a552-85f7226571a4`)
  .then(async e => {
    const fullInfoList = await Promise.all(
      e.data.map(async match => {
        // console.log("match: ", match)
        const res = await axiosAmericas.get(`/tft/match/v1/matches/${match}?api_key=RGAPI-c6af43e3-1c68-486e-a552-85f7226571a4`)

        relevantInfo = normalizeData(res.data.info.participants, puuidResolved)

        return relevantInfo
    }))

    // console.log('fullInfoList: ', fullInfoList)
    return fullInfoList
  })

  // console.log(data)
  const data = {
    time: (Date.now() - start)/1000 + " seconds",
    summoner: summonerInfo.data,
    matches: matches
  }
  console.log("Total time: ", (Date.now() - start)/1000)
  console.log(data)
  res.status(200).send(data)
})

module.exports = router;