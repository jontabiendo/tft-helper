import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import { reverse } from './store/matchesReducer';
import './App.css'
import { useModal, Modal } from '../context/modal';
import OpenModalButton from './components/OpenModalButton';
import Loading from './components/LoadingModal';
import { getMatches, reverseMatchesAction, getMatchesAction } from './store/matchesReducer';
import { setSummoner } from './store/summonerReducer';

function App() {
  const [search, setSearch] = useState("");
  const matches = useSelector((state) => state.matches)
  // const [showSumm, setShowSumm] = useState(false);
  // const [summ, setSumm] = useState(null);
  // const [loading, setLoading] = useState(false)
  // const [content, setContent] = useState([]);
  const {closeModal, modalRef, modalContent} = useModal();

  const dispatch = useDispatch();

  async function findSummoner() {
    console.log(search)
    
    const res = await dispatch(getMatches(search))
    .then(e => {
      console.log("e: ", e.payload)
      dispatch(getMatchesAction(e.payload.matches))
      e.payload.summoner.revisionDate = new Date(e.payload.summoner.revisionDate)
      dispatch(setSummoner(e.payload.summoner))
      closeModal()
    });
    console.log("res: ", res)
    // console.log("thing:", matchesSlice.actions.getMatchesAction(res))

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
        }}/>

      {matches.length > 0 ? (
        <>
          <button onClick={reverseMatches}>Reverse Matches</button>
        </>
      ) : null}
    </>
  )
}

export default App
