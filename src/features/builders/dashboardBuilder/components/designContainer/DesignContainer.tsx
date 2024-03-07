import { useContext } from 'react'
import Style from './DesignContainer.module.css'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { palette } from '@/utils/constans'

export const DesignContainer = ({ children }) => {
  const { dashboardTheme } = useContext(DashboardContentContext)

  return (
    <div
      className={Style['design-container']}
      style={{ backgroundColor: dashboardTheme?.bgColor || palette.white}}
    >
      {children}
    </div>
  )
}