import React from "react";

function MatchTile({match}){
  console.log(match)
  let setName;
  switch (match.queueId) {
    case 6110:
      setName = "5.5 Revival"
      break;
  
    default:
      setName = "Normal"
      break;
  }
  return (
    <div className="match-tile">
      <div className="match-player-metadata-div">
        <h6>#{match.placement}</h6>
        <p>Set {setName}</p>
      </div>
      <div className="match-player-boarddata-div">
        <p>Level: {match.level}</p>
        <div className="match-traits-div">
          {match.traits.map((trait) => (
            <p>{trait.name}</p>
          ))}
        </div>
        <div className="match-augments-div">
          {match.augments.map((augment) => (
            <p>{augment.split("_").pop()}</p>
          ))}
        </div>
        <div className="match-units-div">
          {match.units.map((unit) => (
            <div className={`unit-${unit.rarity}-tile-div`}>
              <p>{new Array(unit.tier).fill(<i class="fa-solid fa-star"></i>)}</p>
              <img src={`https://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${unit.character_id.split("_").pop()}.png`} />
              <span>{new Array(unit.itemNames.length).fill(<i class="fa-solid fa-square"></i>)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Matches({matches}) {
  console.log(matches)

  return (
    <div id="matches-div">
      <h4>Match History</h4>
      {matches.map((match, idx) => 
        (
          <MatchTile match={match} key={idx}/>
        )
      )}
    </div>
  )
};

export default Matches;