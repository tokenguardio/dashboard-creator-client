import { useState } from 'react'

import { Icon } from '@/components/icon/Icon'
import { IconButton } from '@/components/button/IconButton'

import Style from './Toolbar.module.css'
import { AddNewElement } from '../addNewElement/AddNewElement'
import { Customize } from '../customize/Customize'

export const Toolbar = () => {
  const [isShowingCustomizeOptions, setIsShowingCustomizeOptions] = useState(false)
  const [isShowingAddElementOptions, setIsShowingAddElementOptions] = useState(false)

  return (
    <>
      <div className={Style['toolbar']}>
        <IconButton
          icon={isShowingAddElementOptions ? <Icon name="plusElementNegative" width="48" height="48" /> : <Icon name="plusElement" width="48" height="48" />}
          onClick={() => setIsShowingAddElementOptions(!isShowingAddElementOptions)}
        />
        <IconButton
          icon={isShowingCustomizeOptions ? <Icon name="customizeNegative" width="48" height="48" color="red" /> : <Icon name="customize" width="48" height="48" />}
          onClick={() => setIsShowingCustomizeOptions(!isShowingCustomizeOptions)}
        />
      </div>
      {isShowingCustomizeOptions && <Customize />}
      {isShowingAddElementOptions && (
        <div className={Style['add-element-window']}>
          <AddNewElement closeToolbar={setIsShowingAddElementOptions} />
        </div>
      )}
    </>
  )
}
