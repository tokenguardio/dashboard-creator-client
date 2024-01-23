import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import tokenguard from "../tokenguard"
import {
  LineChart,
  BarChart,
} from 'echarts/charts'
import {
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
} from 'echarts/components'
import {
  CanvasRenderer,
} from 'echarts/renderers'
import zoom from '@/assets/icons/zoom.svg'
import reset from '@/assets/icons/reset.svg'
import { palette } from '@/utils/constans'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, ToolboxComponent, BarChart, CanvasRenderer, LineChart, DataZoomSliderComponent, DataZoomInsideComponent]
);

export const AreaChart = ({
  data,
  round,
  minValue,
  maxValue,
  formatValue,
  prefixValue,
  locked,
  theme
}) => {
  console.log('theme', theme)
  console.log('tokenguard', tokenguard)
  const labels = data.map((item => item.date))
  let modifiedData
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  if (typeof round === 'number') {
    modifiedData = data.map(entry => entry.value.toFixed(round))
  } else {
    modifiedData = data
  }

  // general styles
  let style = {
    height: '100%',
    width: '100%',
  }

  // datazoom variables
  let dataZoomBorderColor = palette.gray200
  let dataZoomBgColor = '#f6f6f6'
  let dataZoomFillerColor = '#093cc80a'
  let dataZoomSelectedLineColor = '#0a425e'
  let dataZoomSelectedAreaColor = '#dbe7ed'

  // xAxis variables
  let xAxisLabelColor = palette.gray700
  let xAxisLineColor = palette.gray100
  let xAxisSplitLineColor = palette.gray100

  // yAxis variables
  let yAxisLabelColor = palette.gray700
  let yAxisLineColor = palette.gray100
  let yAxisSplitLineColor = palette.gray100

  // toolbox
  let toolboxZoomIcon = zoom
  let toolboxResetIcon = reset
  let toolboxTextFillColor = '#072f43'

  // tooltip
  let tooltipCrossColor = palette.gray700
  let tooltipLineColor = palette.gray700

  // series
  let itemColor = palette.primary
  let areaStyleObj = {
    opacity: 0.6,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 1,
        color: "#FFFFFF",
      },
      {
        offset: 0,
        color: "#84D3BA",
      },
    ]),
  }
  let tooltipObj = {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        show: false,
      },
      lineStyle: {
        color: tooltipLineColor,
        width: 0.6,
        type: [10, 10],
      },
      crossStyle: {
        color: tooltipCrossColor,
        width: 0.6,
        type: [10, 10],
      },
    }
  }
  let dataZoomObj = [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'none',
      showDetail: false,
      borderColor: dataZoomBorderColor,
      backgroundColor: dataZoomBgColor,
      fillerColor: dataZoomFillerColor,
      borderRadius: 5,
      dataBackground: {
        lineStyle: {
          opacity: 0,
        },
        areaStyle: {
          opacity: 0,
        }
      },
      selectedDataBackground: {
        lineStyle: {
          color: dataZoomSelectedLineColor,
          width: 1,
          opacity: 0.6
        },
        areaStyle: {
          color: dataZoomSelectedAreaColor,
          opacity: 1
        },
      },
      moveHandleSize: 2,
      moveHandleStyle: {
        borderColor: '#CBCBCB',
        color: '#CBCBCB',
      },
      handleStyle: {
        borderColor: '#CBCBCB',
        color: '#CBCBCB',
        borderWidth: 2,
      },
      emphasis: {
        moveHandleStyle: {
          borderColor: '#8E8E8E',
          color: '#8E8E8E'
        },
        handleStyle: {
          borderColor: '#8E8E8E',
          color: '#8E8E8E',
          borderWidth: 2,
        },
      }
    },
    // scroll zoom
    // {
    //   type: 'inside',
    //   xAxisIndex: 0,
    //   filterMode: 'none',
    // },
    // {
    //   type: 'inside',
    //   yAxisIndex: 0,
    //   filterMode: 'none',
    // }
  ]

  if (formatValue) {
    if (prefixValue) {
      tooltipObj.valueFormatter = (value) => (
        `${prefixValue}${formatter.format(value)}`
      )
    } else {
      tooltipObj.valueFormatter = (value) => formatter.format(value)
    }
  }

  if (theme) {
    itemColor = theme.strokeColor
    toolboxTextFillColor = theme.textColor
    tokenguard.color = [ theme.primaryColor, theme.secondaryColor, theme.primaryColor ]
    areaStyleObj.color = theme.gradient ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 1,
        color: "#FFFFFF",
      },
      {
        offset: 0,
        color: theme.primaryColor,
      },
    ]) : theme.primaryColor
    dataZoomObj = theme.dataZoom ? dataZoomObj : []
  }

  if (locked) {
    style.pointerEvents = 'none'
  }

  const option = {
    grid: {
      left: '2%',
      right: '4%',
      width: '94%',
      bottom: 70,
      containLabel: true,
    },
    tooltip: tooltipObj,
    dataZoom: dataZoomObj,
    toolbox: {
      show: true,
      top: 10,
      right: '4%',
      itemSize: 24,
      itemGap: 4,
      feature: {
        dataZoom: {
          show: true,
          icon: {
            zoom: `image://${toolboxZoomIcon}`,
            back: `image://${toolboxResetIcon}`,
          },
        },
      },
      emphasis: {
        iconStyle: {
          textFill: toolboxTextFillColor
        },
      },
    },
    xAxis: {
      type: "category",
      data: labels,
      boundaryGap: false,
      axisLabel: {
        color: xAxisLabelColor,
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: xAxisLineColor,
          width: 0.5,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: xAxisSplitLineColor,
          width: 0.5,
        },
      },
    },
    yAxis: {
      type: "value",
      min: minValue,
      max: maxValue,
      axisLabel: {
        color: yAxisLabelColor,
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: yAxisLineColor,
          width: 0.5,
        },
      },
      splitLine: {
        lineStyle: {
          color: yAxisSplitLineColor,
          width: 0.5,
        },
      }
    },
    series: [
      {
        data: modifiedData,
        type: "line",
        symbol: "circle",
        smooth: true,
        symbolSize: 6,
        itemStyle: {
          color: itemColor,
        },
        lineStyle: {
          width: 2,
        },
        areaStyle: areaStyleObj,
      },
    ],
  }

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={style}
      theme={tokenguard}
    />
  )
}
