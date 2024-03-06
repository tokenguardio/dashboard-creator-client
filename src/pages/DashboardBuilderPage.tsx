/***
 *
 *   Dashboard Builder Page
 *
 **********/

import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { DashboardBuilder } from '@/features/builders/dashboardBuilder/DashboardBuilder'
import { useDashboard } from '@/hooks/useDashboard'
import { prepareElementsFormat, prepareLayoutFormat } from '@/features/dashboard/utils/helpers'


export const DashboardBuilderPage = () => {
  const { id } = useParams()
  const { dashboard, isLoadingDashboard } = useDashboard(id)
  const {
    setDashboardTitle,
    setDashboardId,
    setDashboardElements,
    setDashboardLayout,
    setDashboardTheme,
    setDashboardFilters,
  } = useContext(DashboardContentContext)
  
  useEffect(() => {
    if (dashboard) {
      setDashboardTitle(dashboard.title)
      setDashboardId(dashboard._id)
      setDashboardElements(prepareElementsFormat(dashboard.elements))
      setDashboardLayout(prepareLayoutFormat(dashboard.layout))
      setDashboardTheme(dashboard.theme)
      setDashboardFilters(dashboard.filters)
    }
  }, [dashboard])

  return (
    <DashboardBuilder />
  )
}