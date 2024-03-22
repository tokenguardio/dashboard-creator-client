/***
 *
 *   NOTAVAILABLE
 *
 * displaying temporary information about not available builder
 *
 **********/
import React from 'react'

import Style from './NotAvailable.module.scss'

export function NotAvailable() {
  return (
    <div className={Style.notAvailable}>
      <h3 className={Style.title}>
        Your screen is too small!
      </h3>
      <p className={Style.subtitle}>
        Our create feature is only available on desktop
      </p>
    </div>
  )
}
