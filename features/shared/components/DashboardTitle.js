import { useContext } from 'react'
import { DashboardTitleContext } from '@/contexts/DashboardTitleContext'


export const DashboardTitle = () => {
  const { dashboardTitle } = useContext(DashboardTitleContext)

  return (
    <div>
      {/* <p><{dashboardTitle}</p> */}
    </div>
  )
}