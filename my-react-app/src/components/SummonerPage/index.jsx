import React from 'react';
import { useSelector } from 'react-redux';

import SummonerHeader from './summonerHeader';

function SummonerPage() {
  const summoner = useSelector(state => state.summoner.summoner)
  const matches = useSelector(state => state.matches.matches)
  // console.log(summoner)

  return (
    <>
      <SummonerHeader summoner={summoner}/>
    </>
  )
  
}

export default SummonerPage;