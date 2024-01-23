/***
 *
 *   NOTAVAILABLE
 *
 * displaying temporary information about not available creator
 *
 **********/

import React from 'react'
import { Button, useNavigate } from 'components/lib'
import Style from './notAvailable.module.scss'

export function NotAvailable() {
  const navigate = useNavigate()
  return (
    <div className={Style.notAvailable}>
      <h3 className={Style.title}>Your screen is too small!</h3>
      <p className={Style.subtitle}>
        Our create feature is only available on desktop
      </p>
      <Button text="Go Home" action={() => navigate('/')} />
    </div>
  )
}
