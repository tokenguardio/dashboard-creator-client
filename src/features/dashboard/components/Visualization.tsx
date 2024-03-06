import {
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import { Loader } from '@/components/loader/Loader'
import { AreaChart } from '@/components/charts/areaChart/AreaChart'
import { MultiAreaChart } from '@/components/charts/multiAreaChart/MultiAreaChart'
import { fetchDashboardDataElement } from '@/utils/fetches/dashboard'
// import { logger } from 'utils/logger'

import { convertToUrlFormat } from '../utils/helpers'
import { prepareFiltersBodyRequestFormat } from '../utils/helpers'
import Style from './Visualization.module.css'

// TODO
// function selectProperVis(type) {
//   switch (type) {
//     case 'line':
//       return CustomLineChart
//     case 'areaChart':
//       return CustomAreaChart
//     case 'barChart':
//       return barChartSchema.safeParse(data)
//     case 'singleValue':
//       return SingleValue
//     case 'table':
//       return TableChart
//     case 'pieChart':
//       return CustomPieChart
//     case 'multiAreaChart':
//       return CustomMultiAreaChart
//     default:
//       return null
//   }
// }

// TODO
// function parseData(type, data) {
//   switch (type) {
//     case 'line':
//       return lineSchema.safeParse(data)
//     case 'areaChart':
//       return areaChartSchema.safeParse(data)
//     case 'barChart':
//       return barChartSchema.safeParse(data)
//     case 'table':
//       return tableSchema.safeParse(data)
//     case 'pieChart':
//       return pieChartSchema.safeParse(data)
//     case 'multiAreaChart':
//       return multiAreaChartSchema.safeParse(data)
//     default:
//       return null
//   }
// }

function transformQueryResult(data) {
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return dateA - dateB
  })

  return sortedData.reduce((acc, { dimension_value, date, value }) => {
    if (!acc[dimension_value]) {
      acc[dimension_value] = [];
    }
    acc[dimension_value].push({ date, value })
    return acc
  }, {})
}

function transformData(test) {
  const inputData = transformQueryResult(test)

  let transformedData = {}

  for (let key in inputData) {
    for (let entry of inputData[key]) {
      let date = entry.date;
      let value = entry.value;

      if (!transformedData[date]) {
          transformedData[date] = [];
      }

      transformedData[date].push({ [key]: value });
    }
  }

  let finalResult = []
  for (let date in transformedData) {
      finalResult.push({ x: date, y: transformedData[date] });
  }

  return finalResult
}

function calcHeight(height) {
  const fullHeightOfCard = height * 2 * 10
  const result = fullHeightOfCard - 77 - 42

  return `${result}px`
}

export const Visualization = ({
  element,
  dashboardId,
  filters,
  dashboardTheme,
  elementHeight,
}) => {
  const [data, setData] = useState()
  const [isDataLoading, setIsDataLoading] = useState(false)
  const filtersBodyRequest = prepareFiltersBodyRequestFormat(filters)

  useEffect(() => {
    if (element?.queryId && filtersBodyRequest) {
      const fetchData = async () => {
        try {
          setIsDataLoading(true)
          const bodyRequest = {
            "filters": filtersBodyRequest
          }
          const fetchedElementData = await fetchDashboardDataElement(dashboardId, convertToUrlFormat(element.id), bodyRequest)
          let result = fetchedElementData?.output?.data
          if (element.visType === 'multiAreaChart' || element.visType === 'multiLineChart' || element.visType === 'stackBarChart') {
            result = transformData(fetchedElementData?.output?.data)
          }
          if (element.visType === 'singleValue') {
            result = { currentValue: fetchedElementData?.output?.data[0].current_value }
          }
          
          // VALIDATION TODO
          // const validatedElementData = parseData(element.visType, fetchedElementData)
          // if (!validatedElementData.success) {
          //   logger.error(validatedElementData.error)
          //   throw Error('Incorrect dashboard element response data format')
          // }
          // setData(fetchedElementData?.output?.data)
          setData(result)
          setIsDataLoading(false)
        } catch (err) {
          setIsDataLoading(false)
          toast.error('Upss.. There was a problem to load data')
        }
      }
  
      fetchData()
    }
  }, [element?.queryId, JSON.stringify(filtersBodyRequest)])

  return (
    <>
      {/* {element?.visType === 'singleValue' ? (
          <SingleValue data={data} title={element?.title} loading={isDataLoading} />
      ) : ( */}
      <div
        className={Style['grid-item']}
        style={{
          borderRadius: dashboardTheme.itemGridRadius,
          backgroundColor: dashboardTheme.itemGridBgColor,
          color: dashboardTheme.fontColor,
          borderColor: dashboardTheme.strokeColor
        }}
      >
        <h3
          className={Style['item-title']}
          style={{
            color: dashboardTheme.fontColor,
            fontFamily: dashboardTheme.fontFamily
          }}
        >
          {element?.title}
        </h3>
        {isDataLoading && (
          <Loader />
        )}
        {!isDataLoading &&
          data &&
          {
            'areaChart': <AreaChart
              data={data}
              // height={calcHeight(elementHeight)}
              // round={0}
              // maxValue={100}
              // // locked
              // theme={dashboardTheme}
            />,
            'multiAreaChart': <MultiAreaChart
            data={data}
            // height={calcHeight(elementHeight)}
            // round={0}
            // maxValue={100}
            // locked
            // theme={dashboardTheme}
          />,
            // 'multiLineChart': <CustomMultiLineChart
            //   data={data}
            //   height={calcHeight(elementHeight)}
            //   // round={0}
            //   // maxValue={100}
            //   // locked
            //   // theme={dashboardTheme}
            // />,
            // 'stackBarChart': <CustomStackBarChart
            //   data={data}
            //   height={calcHeight(elementHeight)}
            //   // round={0}
            //   // maxValue={100}
            //   // locked
            //   // theme={dashboardTheme}
            // />,
            // 'lineChart':  <CustomLineChart
            //   data={data}
            //   height={calcHeight(elementHeight)}
            //   // round={round}
            //   // formatValue={formatValue}
            //   // prefixValue={prefixValue}
            // />,
            // 'barChart':  <CustomBarChart
            //   data={data}
            //   height={calcHeight(elementHeight)}
            //   // round={round}
            //   // formatValue={formatValue}
            //   // prefixValue={prefixValue}
            // />,
            // 'pieChart':  <CustomPieChart data={data} />,
            // 'table':  <TableChart
            //   data={data}
            //   height={calcHeight(elementHeight)}
            // />,
          } [element?.visType]
        }         
      </div>
    </>
  )
}