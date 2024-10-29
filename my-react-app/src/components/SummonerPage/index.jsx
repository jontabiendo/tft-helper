import React from 'react';
import { useSelector } from 'react-redux';

import SummonerHeader from './summonerHeader';

import './SummonerHeader.css'

function SummonerPage() {
  const summoner = useSelector(state => state.summoner.summoner)
  const matches = useSelector(state => state.matches.matches)
  // console.log(summoner)

  return (
    <div id='summoner-page'>
      <SummonerHeader summoner={summoner}/>
    </div>
  )
  
}

export default SummonerPage;