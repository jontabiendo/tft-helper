import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { redirect, Route, Routes } from 'react-router-dom';
// import { reverse } from './store/matchesReducer';
import './App.css'
import { useModal, Modal } from '../context/modal';
import  LandingPage  from './components/LandingPage'
import SummonerPage  from './components/SummonerPage'
import OpenModalButton from './components/OpenModalButton';
import Loading from './components/LoadingModal';
import { getMatches, reverseMatchesAction, getMatchesAction } from './store/matchesReducer';
import { setSummoner } from './store/summonerReducer';
import Nav from './components/Nav';

function App() {
  const [search, setSearch] = useState("");
  const [showError, setShowError] = useState(false)
  const matches = useSelector((state) => state.matches)
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

        return redirect(`/summoner/${search}`)
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
      {/* <h1>TFT Helper</h1>

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
       */}
       <Nav />
       <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/summoner' element={<SummonerPage />} />

       </Routes>
    </> 
  )
}

export default App
