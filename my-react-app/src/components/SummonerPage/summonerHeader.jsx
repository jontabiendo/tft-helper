import React from "react";

function SummonerHeader(summoner) {
  summoner = summoner.summoner
  console.log(summoner)
  return (
    <div id="summoner-header">
      <div id="summoner-meta-div">
        <p>Level {summoner.summonerLevel}</p>
        <h2>{summoner.name}</h2>
      </div>
      <div id="rankings-div">
        <h3>Rankings: </h3>
        <div id="rankings-tiles-div">

        {summoner.rankings.RANKED_TFT ? (
          <div className="ranking-tile">
            <h5>Ranked</h5>
            <p>{summoner.rankings.RANKED_TFT.rank} {summoner.rankings.RANKED_TFT.leaguePoints}</p>
            <p>Wins: {summoner.rankings.RANKED_TFT.wins}</p>
            <p>Losses: {summoner.rankings.RANKED_TFT.losses}</p>
          </div>
        ) : null}
          {summoner.rankings.RANKED_TFT_DOUBLE_UP ? (
            <div className="ranking-tile">
            <h5>Double Up</h5>
            <p>{summoner.rankings.RANKED_TFT_DOUBLE_UP.rank} {summoner.rankings.DOUBLE_UP.leaguePoints}</p>
            <p>Wins: {summoner.rankings.DOUBLE_UP.wins}</p>
            <p>Losses: {summoner.rankings.DOUBLE_UP.losses}</p>
          </div>
        ) : null}
        {summoner.rankings.RANKED_TFT_TURBO ? (
          <div className="ranking-tile">
            <h5>Hyper Roll</h5>
            <p>{summoner.rankings.RANKED_TFT_TURBO.ratedTier} {summoner.rankings.RANKED_TFT_TURBO.ratedRating}</p>
            <p>Wins: {summoner.rankings.RANKED_TFT_TURBO.wins}</p>
            <p>Losses: {summoner.rankings.RANKED_TFT_TURBO.losses}</p>
          </div>
        ) : null}
      </div>
      </div>

    </div>
  )
}

export default SummonerHeader