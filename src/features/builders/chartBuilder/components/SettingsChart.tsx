import React from 'react'
import { Icon } from '@/components/icon/Icon'
import { IconButton } from '@/components/button/IconButton'

import Style from './SettingsChart.module.css'

export const SettingsChart = ({
  setChartType,
  chartType,
  isExpandedChart,
  setIsExpandedChart
}) => (
  <div className={Style['settings-chart-container']}>
    <div className={Style['settings-chart-title']}>
      <IconButton
        onClick={() => setIsExpandedChart(!isExpandedChart)}
        icon={isExpandedChart ?
          <Icon name="arrowDown" width="20" height="20" />
          : <Icon name="arrowRight" width="20" height="20" />
        }
      />
      <p>
        Visualization
      </p>
    </div>
    <IconButton
      onClick={() => setChartType('lineChart')}
      icon={<Icon name={chartType === 'lineChart' ? 'lineChartActive' : 'lineChart'} width="24" height="24" />}
    />
    <IconButton
      onClick={() => setChartType('singleValue')}
      icon={<Icon name={chartType === 'singleValue' ? 'singleValueActive' : 'singleValue'} width="24" height="24" />}
    />
    <IconButton
      onClick={() => setChartType('barChart')}
      icon={<Icon name={chartType === 'barChart' ? 'barChartActive' : 'barChart'}  width="24" height="24" />}
    />
  </div>
)