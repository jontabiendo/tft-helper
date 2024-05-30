import { useState } from 'react'
import './App.css'
import { useModal, Modal } from '../context/modal';
import OpenModalButton from './components/OpenModalButton';
import Loading from './components/LoadingModal';

function App() {
  const [search, setSearch] = useState("");
  const [showSumm, setShowSumm] = useState(false);
  const [summ, setSumm] = useState(null);
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState([]);
  const {closeModal, modalRef, modalContent} = useModal();

  async function findSummoner() {
    console.log(search)
    
    const res = await fetch(`http://localhost:3000/riot/${search}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(e => {
      e.json()
      console.log(e)
    })
    .then(e => {
      const fields = []
      console.log("thing2: ", e)
      for (const key in e) {
        fields.push([key, e[key]])
      }
      setContent(fields)
      setShowSumm(true)
      closeModal()
    });
    // console.log("thing:", await res)

    // setSumm(await res)

    console.log(content)

    // setShowSumm(true);

    return null
  }

  return (
    <>
      <h1>TFT Helper</h1>

      <input type='text' id='search' name='search' required maxLength={24} value={search} onChange={(e) => setSearch(e.target.value)}/>

      <OpenModalButton modalComponent={Loading} buttonText="Find Summoner" onButtonClick={findSummoner}/>

      {/* {showSumm ? (
        <>
          {content.map(pair => {
            return (
            <p key={pair[0]}>{pair[0]}: {pair[1]}</p>
          )
          })}
        </>
      ) : null} */}
    </>
  )
}

export default App
