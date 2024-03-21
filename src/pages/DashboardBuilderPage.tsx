/***
 *
 *   Dashboard Builder Page
 *
 **********/

import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { BlockChartProvider } from '@/contexts/BlockChartContext'
import { BlockButtonProvider } from '@/contexts/BlockButtonContext'
import { BlockTextProvider } from '@/contexts/BlockTextContext'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { DashboardBuilder } from '@/features/builders/dashboardBuilder/DashboardBuilder'
import { useDashboard } from '@/hooks/useDashboard'
import { prepareElementsFormat, prepareLayoutFormat } from '@/features/dashboard/utils/helpers'
import { tokenguardTheme } from '@/utils/themes/tokenguard'

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
      setDashboardLayout(prepareLayoutFormat(dashboard.layout, false))
      setDashboardTheme(dashboard.theme ? dashboard.theme : tokenguardTheme)
      setDashboardFilters(dashboard.filters)
    } else {
      setDashboardElements([])
      setDashboardLayout([])
      setDashboardTheme(tokenguardTheme)
      setDashboardTitle('Default Dashboard')
    }
  }, [dashboard])

  return (
    <BlockChartProvider>
      <BlockButtonProvider>
        <BlockTextProvider>
          <DashboardBuilder />
        </BlockTextProvider>
      </BlockButtonProvider>
    </BlockChartProvider>
  )
}