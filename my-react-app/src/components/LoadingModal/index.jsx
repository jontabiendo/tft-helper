import React from "react";
import OpenModalButton from "../OpenModalButton";

import pengu from '../../assets/pengu_gif.webp'

const Loading = () => {
  return (
    <div className='pengu-loading-div'>
      <img src={pengu} />
      <h5>Loading...</h5>

    </div>
  )
}

export default Loading;