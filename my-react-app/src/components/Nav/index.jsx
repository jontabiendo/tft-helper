import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal, Modal } from "../../../context/modal";
import OpenModalButton from "../OpenModalButton";
import Loading from "../LoadingModal";
import { getMatches, getMatchesAction } 
 from "../../store/matchesReducer";
import { setSummoner } from "../../store/summonerReducer";
import { useNavigate } from "react-router-dom";

import './Nav.css'

function Nav() {
  const [search, setSearch] = useState("");
  const [showError, setShowError] = useState(false);

  const {closeModal, modalRef, modalContent} = useModal();
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  async function findSummoner() {
    
    try {
      const res = await dispatch(getMatches(search))
        .then(e => {
          console.log(e)
        dispatch(getMatchesAction(e.payload.matches))
        e.payload.summoner.revisionDate = new Date(e.payload.summoner.revisionDate).toDateString()
        dispatch(setSummoner(e.payload.summoner))
        closeModal()

        setShowError(false)

        navigate(`/summoner`)
      });
    } catch (e) {
      setShowError(true)
      closeModal()
    }

    return null
  };

  return (
    <div id="nav">
      <h1 id="nav-title">TFT Helper</h1>
      
      <div id="search-div">
        <input type='text' id='search' name='search' required maxLength={24} value={search} onChange={(e) => setSearch(e.target.value)}/>

        <OpenModalButton modalComponent={Loading} buttonText="Find Summoner" onButtonClick={findSummoner}/>

        {showError ? (
          <p className='error-text' >Summoner Not Found</p>
        ) : null}
      </div>
    </div>
  )
};

export default Nav;