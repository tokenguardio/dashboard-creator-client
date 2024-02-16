import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import tokenguard from "../tokenguard"
import {
  LineChart,
} from 'echarts/charts'
import {
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  LegendComponent,
} from 'echarts/components'
import {
  CanvasRenderer,
} from 'echarts/renderers'
import zoom from '@/assets/icons/zoom.svg'
import reset from '@/assets/icons/reset.svg'
import { palette } from '@/utils/constans'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, ToolboxComponent, CanvasRenderer, LineChart, DataZoomSliderComponent, LegendComponent, DataZoomInsideComponent]
)

export const MultiAreaChart = ({
  data,
  additionalLegendData,
  round,
  minValue,
  maxValue,
  prefixValue,
  formatValue,
  locked,
  theme,
}) => {
  let legendsData = []
  let labelsData = []
  let seriesData = []
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

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
  let xAxisLabelFont = 'sans-serif'

  // yAxis variables
  let yAxisLabelColor = palette.gray700
  let yAxisLineColor = palette.gray100
  let yAxisSplitLineColor = palette.gray100
  let yAxisLabelFont = 'sans-serif'


  // toolbox
  let toolboxZoomIcon = zoom
  let toolboxResetIcon = reset
  let toolboxTextFillColor = '#072f43'

  // tooltip
  let _tooltipCrossColor = palette.gray700
  let tooltipLineColor = palette.gray700

  // legend
  let selectorLabelColor = palette.gray700
  let itemLegendTextColor = palette.gray700
  
  // series
  let firstItemColor = palette.secondary
  let secontItemColor = palette.primary
  let areaStyleFirstObj = {
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
  let areaStyleSecondObj = {
    opacity: 0.6,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#45677c",
      },
      {
        offset: 1,
        color: "#ffffff",
      },
    ]),
  }
  let firstItemStyle = {
    color: firstItemColor,
  }
  let secondItemStyle = {
    color: secontItemColor,
  }
  let tooltipObj = {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: tooltipLineColor,
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
    }
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

  if (theme) {
    toolboxTextFillColor = theme.fontColor
    yAxisLabelColor = theme.fontColor
    xAxisLabelColor = theme.fontColor
    xAxisLabelFont = theme.fontFamily
    yAxisLabelFont = theme.fontFamily
    tokenguard.color = [ theme.primaryColor, theme.secondaryColor, theme.primaryColor ]
    areaStyleFirstObj.color = theme.gradient ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 1,
        color: "#FFFFFF",
      },
      {
        offset: 0,
        color: theme.secondaryColor,
      },
    ]) : theme.secondaryColor
    areaStyleSecondObj.color = theme.gradient ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: theme.primaryColor,
      },
      {
        offset: 1,
        color: "#ffffff",
      },
    ]) : theme.primaryColor
    dataZoomObj = theme.dataZoom ? dataZoomObj : []
  }

  if (formatValue) {
    if (prefixValue) {
      tooltipObj.valueFormatter = (value) => (
        `${prefixValue}${formatter.format(value)}`
      )
    } else {
      tooltipObj.valueFormatter = (value) => formatter.format(value)
    }
  }

  if (!Array.isArray(data) && typeof data === 'object') {
    for (let key in data) {
      labelsData = data[key].map(entry => entry.date)
      if (!additionalLegendData) {
        legendsData.push(key)
      }
      let points = data[key].map(entry => entry.value)
      if (typeof round === 'number') {
        points = data[key].map(entry => entry.value?.toFixed(round))
      }
  
      seriesData.push({
        data: points,
        type: 'line',
        smooth: true,
        clip: true,
        symbolSize: 6,
        symbol: 'circle',
        emphasis: {
          focus: 'series'
        },
      });
    }

    if (additionalLegendData) {
      legendsData = additionalLegendData.map(item => item.name)
      seriesData[0].name = legendsData[0]
      seriesData[1].name = legendsData[1]
    }
  }


  seriesData[0].areaStyle = areaStyleFirstObj
  seriesData[1].areaStyle = areaStyleSecondObj
  seriesData[0].itemStyle = firstItemStyle
  seriesData[1].itemStyle = secondItemStyle

  let toolboxObj = {
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
  }

  if (locked) {
    style.pointerEvents = 'none'
  }

  const option = {
    tooltip: tooltipObj,
    legend: {
      data: legendsData,
      top: 10,
      width: '94%',
      left: '2%',
      type: 'scroll',
      orient: 'horizontal',
      icon: 'circle',
      padding: [0, 4, 0, 0],
      pageIconColor: '#062434',
      textStyle: {
        overflow: 'breakAll',
        color: itemLegendTextColor,
      },
      itemGap: 16,
      itemWidth: 10,
      itemHeight: 10,
      selectorItemGap: 4,
      selectorLabel: {
        color: selectorLabelColor,
        width: 38,
        height: 23,
        padding: 0,
        fontSize: 12,
        verticalAlign: 'middle',
        align: 'center',
        backgroundColor: '#F4F4F4',
        borderColor: '#CBCBCB',
        borderWidth: 0.6,
        borderRadius: 4,
      },
      emphasis: {
        selectorLabel: {
          color: '#fff',
          backgroundColor: '#062434',
          borderColor: '#062434',
        },
      },
    },
    toolbox: toolboxObj,
    grid: {
      top: 60,
      left: '2%',
      right: '4%',
      width: '94%',
      bottom: 70,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: labelsData,
        boundaryGap: false,
        axisLabel: {
          color: xAxisLabelColor,
          fontSize: 12,
          fontFamily: xAxisLabelFont
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          onZero: true,
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
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: minValue,
        max: maxValue,
        axisLabel: {
          color: yAxisLabelColor,
          fontSize: 12,
          fontFamily: yAxisLabelFont
        },
        axisLine: {
          onZero: true,
          show: true,
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
    ],
    dataZoom: dataZoomObj,
    series: seriesData
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
