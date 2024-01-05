import { useState, useContext } from 'react'
import { DashboardTitleContext } from '@/contexts/DashboardTitleContext'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { TextInput } from '@/components/input/TextInput'
import { IconButton } from '@/components/button/IconButton'
import edit from '@/assets/icons/edit.svg'
import Style from './DashboardTitle.module.scss'

export const DashboardTitle = () => {
  const { dashboardTitle, setDashboardTitle } = useContext(DashboardTitleContext)
  const [editing, setEditing] = useState(false)

  const ref = useOutsideClick(() => {
    setEditing(false)
  });

  const handleClick = () => {
    setEditing(true)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardTitle(e.target.value)
  }

  const handleBlur = () => {
    setEditing(false)
  }

  return (
    <div className={Style.container}>
      {editing ? (
        <TextInput
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
        icon={edit}
      />
    </div>
  )
  }
