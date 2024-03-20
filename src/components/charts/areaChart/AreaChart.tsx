import React, { useEffect, useRef, useState } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
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
} from 'echarts/components'
import {
  CanvasRenderer,
} from 'echarts/renderers'

import tokenguard from "../tokenguard"

import zoom from '@/assets/icons/zoom.svg'
import reset from '@/assets/icons/reset.svg'
import { palette } from '@/utils/constans'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  ToolboxComponent,
  CanvasRenderer,
  LineChart,
  DataZoomSliderComponent,
  DataZoomInsideComponent
])

export const generateLegendsData = (data) => {
  const uniqueKeys = new Set()

  data.forEach(point => {
    Object.keys(point).forEach(key => {
      if (key !== 'dimension') {
        uniqueKeys.add(key)
      }
    })
  })

  return Array.from(uniqueKeys)
}

export const calcWidthOfLegend = (width, numbersOfToolboxItem) => {
  const iconWidth = 33 // icon + space
  const widthOfSpaceWithoutMargins = 0.94
  const widthOfToolbox = (numbersOfToolboxItem * iconWidth * 1) / width
  const result = widthOfSpaceWithoutMargins - widthOfToolbox
  const formattedResult = Math.round(result * 100).toString()

  return formattedResult
}

export function findValueByName(array, name) {
  for (let i = 0; i < array.length; i++) {
      let obj = array[i]
      if (name in obj) {
          return obj[name]
      }
  }
  return null
}

export const calcAverage = (arr, length) => {
  if (arr.length === 0) {
    return 0;
  }

  const sum = arr.reduce((acc, value) => acc + value, 0);
  const average = sum / length;
  return average;
}

export const getTopSeriesData = (length, seriesData) => {
  const average_data = seriesData.map(item => {
    return {
      name:  item.name,
      average: calcAverage(item.data, length)
    }
  })

  return average_data
}

export function getTopNamesSelected(arr) {
  arr.sort((a, b) => b.average - a.average);
  const selected = {};

  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    selected[obj.name] = i < 10 ? true : false;
  }

  return selected;
}

export const useContainerDimensions = myRef => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 })

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight
    })

    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions
};

export const AreaChart = ({
  data,
  height,
  locked,
  theme
}) => {
  const [legendWidth, setLegendWidth] = useState()
  const componentRef = useRef()
  const { width } = useContainerDimensions(componentRef)
  let topSeriesData
  const legendsData = generateLegendsData(data)
  const labelsData = data.map(point => point.dimension)

  useEffect(() => {
    if (legendsData.length > 10) {
      setLegendWidth(calcWidthOfLegend(width, 3))
    } else {
      setLegendWidth(calcWidthOfLegend(width, 2))
    }
  }, [width])

  // legend
  let selectorLabelColor = palette.gray700
  let itemLegendTextColor = palette.gray700

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
    let tooltipCrossColor = palette.gray700
    let tooltipLineColor = palette.gray700

  const generatedSeries = legendsData.map(legendItem => {
    let result = []
    data.forEach((row) => {
      result.push(row[legendItem])
    })

    return {
      data: result,
      type: 'line',
      smooth: true,
      clip: true,
      name: legendItem,
      symbolSize: 6,
      symbol: 'circle',
      emphasis: {
        focus: 'series'
      },
    }
  })

  const seriesData = generatedSeries

  let legendSelector = [
    {
      type: 'all',
      title: 'All'
    },
    {
      type: 'inverse',
      title: 'Inv'
    }
  ]
  let legendObj = {
    data: legendsData,
    top: 0,
    width: `${legendWidth}%`,
    left: '2%',
    type: 'scroll',
    orient: 'horizontal',
    icon: 'circle',
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
  }

  let areaStyleObj = {
    opacity: 0.6,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 1,
        color: "#FFFFFF",
      },
      {
        offset: 0,
        // color: "#84D3BA",
        color: palette.primary,
      },
    ]),
  }
  let toolboxObj = {
    show: true,
    top: 0,
    right: '4%',
    itemSize: 24,
    itemGap: 4,
    feature: {
      dataZoom: {
        show: true,
        icon: {
          zoom: `image://${zoom}`,
          back: `image://${reset}`,
        },
      },
    },
    emphasis: {
      iconStyle: {
        textFill: '#072F43'
      },
    },
  }
  // let restoreIconObj = {
  //   show: true,
  //   icon: `image://${restore}`,
  // }

  if (legendsData.length > 10) {
    topSeriesData = getTopSeriesData(labelsData.length, seriesData)
    legendObj.selected = getTopNamesSelected(topSeriesData)
    legendObj.selector = legendSelector
    legendObj.right = '4%'
    // toolboxObj.feature.restore = restoreIconObj
  } else if (10 > legendsData.length > 5) {
    legendObj.selected = legendsData
    legendObj.selector = legendSelector
    legendObj.right = '4%'
  } else {
    legendObj.selected = legendsData
    legendObj.selector = []
    legendObj.left = '2%'
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
  ]

  if (theme) {
    toolboxTextFillColor = theme.fontColor
    yAxisLabelColor = theme.fontColor
    xAxisLabelColor = theme.fontColor
    yAxisLabelFont = theme.fontFamily
    xAxisLabelFont = theme.fontFamily
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

  const style = {
    height: height ? height : '300px',
    margin: 'auto'
  }

  if (locked) {
    style.pointerEvents = 'none'
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#656565',
          width: 0.6,
          type: [10, 10],
        },
      }
    },
    legend: legendObj,
    toolbox: toolboxObj,
    grid: {
      top: 50,
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
          color: '#656565',
          fontSize: 12,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#DCDCDC',
            width: 0.5,
          },
        },
        splitLine: {
          color: '#DCDCDC',
          width: 0.5,
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: '#656565',
          fontSize: 12,
        },
        axisLine: {
          onZero: true,
          show: true,
          lineStyle: {
            color: '#DCDCDC',
            width: 0.5,
          },
        },
      },
      {
        axisLine: {
          onZero: true,
          show: true,
          lineStyle: {
            color: '#DCDCDC',
            width: 0.5,
          },
        },
      },
    ],
     dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'none',
        showDetail: false,
        borderColor: '#CBCBCB',
        backgroundColor: '#f6f6f6',
        fillerColor: 'rgba(9, 60, 200, 0.04)',
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
            color: '#0A425E',
            width: 1,
            opacity: 0.6
          },
          areaStyle: {
            color: '#DBE7ED',
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
    ],
    series: seriesData
  }

  return (
    <div
      ref={componentRef}
      style={{
        width: '100%',
        margin: 'auto'
      }}
    >
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={tokenguard}
        style={style}
      />
    </div>
  )
}
