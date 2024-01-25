import { useState, useContext } from 'react'

import { DashboardTitleContext } from '@/contexts/DashboardTitleContext'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { TextInput } from '@/components/input/TextInput'
import { IconButton } from '@/components/button/IconButton'
import { Icon } from '@/components/icon/Icon'

import Style from './DashboardTitle.module.scss'

export const DashboardTitle = () => {
  const dashboardTitleContext = useContext(DashboardTitleContext)
  const [editing, setEditing] = useState<boolean>(false)

  if (!dashboardTitleContext) {
    throw new Error('dashboardTitle must be used in Provider')
  }

  const { dashboardTitle, setDashboardTitle } = dashboardTitleContext

  const ref = useOutsideClick(() => {
    setEditing(false)
  })

  const handleClick = () => {
    setEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardTitle(e.target.value)
  }

  const handleBlur = () => {
    setEditing(false)
  }

  return (
    <div className={Style['dashboard-title-container']}>
      {editing ? (
        <TextInput
          name="dashboard-title"
          value={dashboardTitle}
          change={handleChange}
          blur={handleBlur}
          ref={ref}
        />
      ) : (
        <p className={Style['title']}>{dashboardTitle}</p>
      )}
      <IconButton
        onClick={handleClick}
        icon={<Icon name="edit" height="1.6rem" width="1.6rem" />}
      />
    </div>
  )
  }
