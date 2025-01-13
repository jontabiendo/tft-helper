import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { reverse } from './store/matchesReducer';
// import './App.css'
import { useModal, Modal } from '../../../context/modal';
import OpenModalButton from '../OpenModalButton';
import Loading from '../LoadingModal';
import { getMatches, reverseMatchesAction, getMatchesAction } from '../../store/matchesReducer';
import { setSummoner } from '../../store/summonerReducer';

import './LandingPage.css'

function LandingPage() {
  const [search, setSearch] = useState("");
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()
  const {closeModal, modalRef, modalContent} = useModal();

  const dispatch = useDispatch();

  async function findSummoner() {
    
    try {
      const res = await dispatch(getMatches(search))
        .then(e => {
      // console.log("e: ", e.payload)
        dispatch(getMatchesAction(e.payload.matches))
        e.payload.summoner.revisionDate = new Date(e.payload.summoner.revisionDate).toDateString()
        dispatch(setSummoner(e.payload.summoner))
        closeModal()

        navigate(`/summoner`)
      });
    } catch (e) {
      setShowError(true)
      closeModal()
    }

    return null
  }

  return (
    <div id='landing-div'>
      <h1>TFT Helper</h1>

      <input type='text' id='search' name='search' required maxLength={24} value={search} onChange={(e) => setSearch(e.target.value)}/>

      <OpenModalButton modalComponent={Loading} buttonText="Find Summoner" onButtonClick={findSummoner}/>

      {showError ? (
        <p className='error-text'>Summoner Not Found</p>
      ) : null}

    </div>
  )
}

export default LandingPage;
