import React, { useState } from 'react'

import { SettingsChart } from '@/features/builders/chartBuilder/components/SettingsChart'
import { ResultingChart } from '@/features/builders/chartBuilder/components/ResultingChart'
import { SettingsDataTable } from '@/features/builders/chartBuilder/components/SettingsDataTable'
import { ResultingDataTable } from '@/features/builders/chartBuilder/components/ResultingDataTable'

import Style from './ResultView.module.css'

export const ResultView = ({
  chartType,
  setChartType,
  data,
}) => {
  const [isExpandedChart, setIsExpandedChart] = useState(true)
  const [isExpandedDataTable, setIsExpandedDataTable] = useState(true)

  return (
    <div className={Style['result-view-container']}>
      <SettingsChart
        setChartType={setChartType}
        chartType={chartType}
        setIsExpandedChart={setIsExpandedChart}
        isExpandedChart={isExpandedChart}
      />
      {isExpandedChart && (
        <ResultingChart
          data={data}
          chartType={chartType}
        />
      )}
      <SettingsDataTable
        setIsExpandedDataTable={setIsExpandedDataTable}
        isExpandedDataTable={isExpandedDataTable}
      />
      {isExpandedDataTable && <ResultingDataTable data={data} />}
    </div>
  )
}