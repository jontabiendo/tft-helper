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
            <div className="unit-tile-div">
              <p>{unit.tier} Star</p>
              <p>{unit.character_id.split("_").pop()}</p>
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