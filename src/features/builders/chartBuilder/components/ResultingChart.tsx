import React, { useContext } from 'react'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { AreaChart } from '@/components/charts/areaChart/AreaChart'
import { SingleValue } from '@/components/charts/singleValue/SingleValue'
import { CustomBarChart } from '@/components/charts/barChart/BarChart'
import { adjustForSingleValue } from '@/utils/helpers'

import Style from './ResultingChart.module.css'

export const ResultingChart = ({
  data,
  chartType,
  chartTitle,
}) => {
  const { dashboardTheme } = useContext(DashboardContentContext)

  const validateSingleValueData = (data: unknown) => {
    if (adjustForSingleValue(data)) {
      return (
        <div className={Style['single-value-container']}>
          <SingleValue
            data={adjustForSingleValue(data)}
            theme={dashboardTheme}
            title={chartTitle}
          />
        </div>
      )
    } else {
      return (
        <p className={Style['text-notification']}>
          Not possible to display single value metric for selected data
        </p>
      )
    }
  }

  return (
    <div className={Style['resulting-chart-container']}>
      {data &&
        {
          'areaChart': <AreaChart
            data={data}
            theme={dashboardTheme}
          />,
          'lineChart': <AreaChart
            data={data}
            theme={dashboardTheme}
          />,
          'barChart': <CustomBarChart
            data={data}
            theme={dashboardTheme}
          />,
          'singleValue': <>{validateSingleValueData(data)}</>
        } [chartType]
      }
    </div>
  )
}