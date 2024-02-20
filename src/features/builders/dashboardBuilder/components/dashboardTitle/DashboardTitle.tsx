import { useState, useContext } from 'react'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { TextInput } from '@/components/input/TextInput'
import { IconButton } from '@/components/button/IconButton'
import { Icon } from '@/components/icon/Icon'

import Style from './DashboardTitle.module.scss'

export const DashboardTitle = () => {
  const dashboardContentContext = useContext(DashboardContentContext)
  const [editing, setEditing] = useState<boolean>(false)

  if (!dashboardContentContext) {
    throw new Error('Dashboard title must be used in Provider')
  }

  const { dashboardTitle, setDashboardTitle } = dashboardContentContext

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
    <div
      className={Style['dashboard-title-container']}
      ref={ref}
    >
      {editing ? (
        <TextInput
          name="dashboard-title"
          value={dashboardTitle}
          change={handleChange}
          blur={handleBlur}
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
