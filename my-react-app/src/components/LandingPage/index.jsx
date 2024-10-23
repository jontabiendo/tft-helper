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

function LandingPage() {
  const [search, setSearch] = useState("");
  const [showError, setShowError] = useState(false)
  const matches = useSelector((state) => state.matches)
  const navigate = useNavigate()
  // const [showSumm, setShowSumm] = useState(false);
  // const [summ, setSumm] = useState(null);
  // const [loading, setLoading] = useState(false)
  // const [content, setContent] = useState([]);
  const {closeModal, modalRef, modalContent} = useModal();
  // debugger

  const dispatch = useDispatch();

  async function findSummoner() {
    // console.log(search)
    
    try {
      const res = await dispatch(getMatches(search))
        .then(e => {
      // console.log("e: ", e.payload)
        dispatch(getMatchesAction(e.payload.matches))
        e.payload.summoner.revisionDate = new Date(e.payload.summoner.revisionDate).toDateString()
        dispatch(setSummoner(e.payload.summoner))
        closeModal()
        
      });
    } catch (e) {
      setShowError(true)
      closeModal()
    }

    // setSumm(await res)

    // console.log(content)

    // setShowSumm(true);

    return null
  }

  // function reverseMatches() {
  //   dispatch(reverseMatchesAction(matches))
  // }

  // console.log(matches)

  return (
    <>
      <h1>TFT Helper</h1>

      <input type='text' id='search' name='search' required maxLength={24} value={search} onChange={(e) => setSearch(e.target.value)}/>

      <OpenModalButton modalComponent={Loading} buttonText="Find Summoner" onButtonClick={findSummoner}/>

      <OpenModalButton modalComponent={Loading} buttonText="Reverse Matches" onButtonClick={
        () => {
          dispatch(reverseMatchesAction())
          closeModal()
        }}
      />

      {showError ? (
        <p className='error-text'>Summoner Not Found</p>
      ) : null}

      {matches.length > 0 ? (
        <>
          <button onClick={reverseMatches}>Reverse Matches</button>
        </>
      ) : null}
    </>
  )
}

export default LandingPage;
