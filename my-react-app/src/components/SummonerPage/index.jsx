import React from 'react';
import { useSelector } from 'react-redux';

import SummonerHeader from './summonerHeader';
import RecentStats from './RecentStats';
import Matches from './Matches';

import './SummonerHeader.css'

function SummonerPage() {
  const summoner = useSelector(state => state.summoner.summoner)
  const matches = useSelector(state => state.matches.matches)

  return (
    <div id='summoner-page'>
      <SummonerHeader summoner={summoner}/>
      <RecentStats rankedStats={summoner.rankings}/>
      <Matches matches={matches} />
    </div>
  )
  
}

export default SummonerPage;