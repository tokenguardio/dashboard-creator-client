import React from 'react'

import { Icon } from '@/components/icon/Icon'
import { IconButton } from '@/components/button/IconButton'

import Style from './SettingsDataTable.module.css'

export const SettingsDataTable = ({
  isExpandedDataTable,
  setIsExpandedDataTable,
}) => {
  return (
    <div className={Style['settings-datatable-container']}>
      <IconButton
        onClick={() => setIsExpandedDataTable(!isExpandedDataTable)}
        icon={isExpandedDataTable ?
          <Icon name="arrowDown" width="20" height="20" />
          : <Icon name="arrowRight" width="20" height="20" />
        }
      />
      <p className={Style['settings-datatable-title']}>
        Data
      </p>
    </div>
  )
}