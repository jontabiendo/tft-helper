import { useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState("");
  const [showSumm, setShowSumm] = useState(false);
  const [summ, setSumm] = useState(null);

  const [content, setContent] = useState([]);

  async function findSummoner(e, name) {
    e.preventDefault()
    const parts = name.split("#")
    // get puuid
    const puuid = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${parts[0]}/${parts[1]}?api_key=RGAPI-e7a826e1-4216-42f4-991a-e882b23a0b29`, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
    }
    })
    
    const puuidResolved = await puuid.json().puuid;
    console.log("resolved", puuidResolved)

    // get summoner info
    const summonerInfo = await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuidResolved}?api_key=RGAPI-e7a826e1-4216-42f4-991a-e882b23a0b29`)

    setSumm(await summonerInfo.json())

    for (const [key, value] of summ.entries()) {
      setContent([...content, [key, value]])
    }
    console.log(content)

    setShowSumm(true);

    return null
  }

  return (
    <>
      <h1>TFT Helper</h1>

      <input type='text' id='search' name='search' required maxLength={24} value={search} onChange={(e) => setSearch(e.target.value)}/>

      <button onClick={(e) => findSummoner(e, search)}>Find Summoner</button>

      {showSumm ? (
        <>
          {content.map(pair => {
            <span key={pair[0]}>{pair[0]}: {pair[1]}</span>
          })}
        </>
      ) : null}
    </>
  )
}

export default App
