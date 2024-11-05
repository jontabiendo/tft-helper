import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/modal";
import OpenModalButton from "../OpenModalButton";
import Loading from "../LoadingModal";
import { getMatches } from "../../store/matchesReducer";

function SummonerHeader({summoner}) {
  const dispatch = useDispatch();
  summoner = summoner

  const { closeModal } = useModal();
  // summoner = summoner.summoner
  const revisionDiff = Date.now() - new Date(summoner.revisionDate)
  let revisionTime;

  switch (revisionDiff) {
    case revisionDiff < 60000:
      revisionTime = `${Math.floor(revisionDiff / 60000)} minutes ago`
      break
    case revisionDiff < 3600000:
      revisionTime = `${Math.floor(revisionDiff / 60000)} hour ago`
      break
    case revisionDiff < 86400000:
      revisionTime = `${Math.floor(revisionDiff / 3600000)} hours ago`
      break
    case revisionDiff < 172800000:
      revisionTime = `${Math.floor(revisionDiff / 86400000)} day ago`
      break
    default:
      revisionTime = `${Math.floor(revisionDiff / 86400000)} days ago`
      break
  }

  async function updateSummoner() {
    
    try {
      const res = await dispatch(getMatches(summoner.name))
        .then(e => {
        dispatch(getMatchesAction(e.payload.matches))
        e.payload.summoner.revisionDate = new Date(e.payload.summoner.revisionDate).toDateString()
        dispatch(setSummoner(e.payload.summoner))
        closeModal()


      });
    } catch (e) {
      closeModal()
    }

    return null
  };

  return (
    <div id="summoner-header">
      <div id="summoner-meta-div">
        <p className="light-p">Level {summoner.summonerLevel}</p>
        <h2 id='summoner-name'>{summoner.name}</h2>
        <OpenModalButton modalComponent={Loading} buttonText="Update" buttonClass="accent-button-a" onButtonClick={updateSummoner}/>
        <button className="accent-button-b" onClick={() => console.log('In progress...')}>Set 11 Report</button>
        <p className="light-p">Last Updated: {revisionTime}</p>
      </div>
      <div id="rankings-div">
        <h3>Rankings: </h3>
        <div id="rankings-tiles-div">
          <div className="ranking-tile">
            <h5>Ranked</h5>
            <img className="rank-img" src={`https://cdn.dak.gg/tft/images2/tft/tiers/${summoner.rankings["RANKED_TFT"] ? (summoner.rankings["RANKED_TFT"]).rank.split(" ")[0].toLowerCase() : 'provisional'}.png?set=10`} />
        {summoner.rankings.RANKED_TFT ? (
          <>
            <p>{summoner.rankings.RANKED_TFT.rank} {summoner.rankings.RANKED_TFT.leaguePoints}LP</p>
            <p>Wins: {summoner.rankings.RANKED_TFT.wins} Losses: {summoner.rankings.RANKED_TFT.losses}</p>
          </>
          ) : (
            <p>Unrated</p>
          )}
          </div>
          <div className="ranking-tile">
            <h5>Double Up</h5>
            <img className="rank-img" src={`https://cdn.dak.gg/tft/images2/tft/tiers/${summoner.rankings["RANKED_TFT_DOUBLE_UP"] ? (summoner.rankings["RANKED_TFT_DOUBLE_UP"]).rank.split(" ")[0].toLowerCase() : 'provisional'}.png?set=10`} />
            {summoner.rankings.RANKED_TFT_DOUBLE_UP ? (
              <>
                <p>{summoner.rankings.RANKED_TFT_DOUBLE_UP.rank} {summoner.rankings.RANKED_TFT_DOUBLE_UP.leaguePoints}LP</p>
                <p>Wins: {summoner.rankings.RANKED_TFT_DOUBLE_UP.wins} Losses: {summoner.rankings.RANKED_TFT_DOUBLE_UP.losses}</p>
              </>
            ) : (
              <p>Unrated</p>
            )}
          </div>
          <div className="ranking-tile">
            <h5>Hyper Roll</h5>
            <img className="rank-img" src={`https://cdn.dak.gg/tft/images2/tft/tiers/${summoner.rankings["RANKED_TFT_TURBO"] ?summoner.rankings["RANKED_TFT_TURBO"].ratedTier.toLowerCase() : 'provisional'}.png?set=10`} />
            {summoner.rankings.RANKED_TFT_TURBO ? (
              <>
                <p>{summoner.rankings.RANKED_TFT_TURBO.ratedTier === "ORANGE" ? "Hyper" : summoner.rankings.RANKED_TFT_TURBO.ratedTier} {summoner.rankings.RANKED_TFT_TURBO.ratedRating}</p>
                <p>Wins: {summoner.rankings.RANKED_TFT_TURBO.wins} Losses: {summoner.rankings.RANKED_TFT_TURBO.losses}</p>
              </>
            ) : (
              <p>Unrated</p>
            )}
          </div>
      </div>
      </div>

    </div>
  )
}

export default SummonerHeader