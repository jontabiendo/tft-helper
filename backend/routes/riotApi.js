var express = require('express');
const axios = require('axios')
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
  console.log("fetcing puuid")
  console.log("*")
  console.log("*")
  console.log("*")
  const puuid = await axiosAmericas.get(`/riot/account/v1/accounts/by-riot-id/${req.params.summoner}/NA1?api_key=RGAPI-6a257310-2472-4ae5-a538-df516ded0288`)

  console.log("*")
  console.log("*")
  console.log("*")
  console.log("resolving puuidd")
  console.log("*")
  console.log("*")
  console.log("*")

  const puuidResolved = await puuid.data.puuid;

  console.log("*")
  console.log("*")
  console.log("*")
  console.log("fetchign summoner info", puuidResolved)
  console.log("*")
  console.log("*")
  console.log("*")
  
  const summonerInfo = await axiosNA1.get(`/summoner/v1/summoners/by-puuid/${puuidResolved}?api_key=RGAPI-6a257310-2472-4ae5-a538-df516ded0288`);
  console.log("*")
  console.log("*")
  console.log("*")
  console.log("summoner info received")
  console.log("*")
  console.log("*")
  console.log("*")
  const matches = await axiosAmericas.get(`/tft/match/v1/matches/by-puuid/${puuidResolved}/ids?count=10&api_key=RGAPI-6a257310-2472-4ae5-a538-df516ded0288`)
  .then(async e => {
    // const res = await axiosAmericas.get(`/tft/match/v1/matches/${e.data[0]}?api_key=RGAPI-6a257310-2472-4ae5-a538-df516ded0288`)
    // console.log(res)
    // return res.data

    // console.log("e: ", e.data)
    // const fullInfoList = e.data.map(match => {
    //   axiosAmericas.get(`/tft/match/v1/matches/${match}?api_key=RGAPI-6a257310-2472-4ae5-a538-df516ded0288`)
    // })
    // const res = await Promise.all(fullInfoList)
    const fullInfoList = await Promise.all(
      e.data.map(async match => {
        console.log("match: ", match)
        const res = await axiosAmericas.get(`/tft/match/v1/matches/${match}?api_key=RGAPI-6a257310-2472-4ae5-a538-df516ded0288`)

        return res.data
    }))

    // console.log('fullInfoList: ', fullInfoList)

    return fullInfoList
  })

  const data = {
    summoner: summonerInfo.data,
    matches: matches
  }
  console.log(data)
  console.log("Total time: ", (Date.now() - start)/1000)
  res.status(200).send(data)
})

module.exports = router;