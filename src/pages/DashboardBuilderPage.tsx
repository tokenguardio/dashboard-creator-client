/***
 *
 *   Dashboard Builder Page
 *
 **********/

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { DashboardBuilder } from '@/features/builders/dashboardBuilder/DashboardBuilder'
import { useDashboard } from '@/hooks/useDashboard'


export const DashboardBuilderPage = () => {
  const { id } = useParams()
  // const { dashboard }
  // const {
  //   dashboardElements,
  //   setDashboardElements,
  //   setDashboardLayout,
  //   dashboardLayout,
  //   dashboardTheme
  // } = useContext(DashboardContentContext)

  // useEffect(() => {
    
  // }, [id])

  return (
    <DashboardBuilder />
  )
}