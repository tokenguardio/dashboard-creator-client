/***
 *
 *   LOADER
 *
 **********/
import React from 'react'

import ThreeDots from './images/three-dots.svg'
import Style from './Loader.module.css'

export function Loader() {

  return (
    <div className={Style['loader']}>
      <img className={Style['spinner']} src={ThreeDots} alt="dots Loader" />
    </div>
  )
}
