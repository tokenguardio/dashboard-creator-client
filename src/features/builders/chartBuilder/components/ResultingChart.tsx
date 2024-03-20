import React, { useContext } from 'react'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { AreaChart } from '@/components/charts/areaChart/AreaChart'
import { CustomBarChart } from '@/components/charts/barChart/BarChart'

import Style from './ResultingChart.module.css'

export const ResultingChart = ({ data, chartType }) => {
  const { dashboardTheme } = useContext(DashboardContentContext)

  return (
    <div className={Style['resulting-chart-container']}>
      {data &&
        {
          'areaChart': <AreaChart
            data={data}
            theme={dashboardTheme}
            locked
          />,
          'lineChart': <AreaChart
            data={data}
            theme={dashboardTheme}
            locked
          />,
          'barChart': <CustomBarChart
            data={data}
            theme={dashboardTheme}
            locked
          />,
        } [chartType]
      }     
    </div>
  )
}