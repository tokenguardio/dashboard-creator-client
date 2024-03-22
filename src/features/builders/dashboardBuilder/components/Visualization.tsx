import React, {
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import { Loader } from '@/components/Loader/Loader'
import { AreaChart } from '@/components/charts/areaChart/AreaChart'
import { CustomBarChart } from '@/components/charts/barChart/BarChart'
import { SingleValue } from '@/components/charts/singleValue/SingleValue'
import {
  fetchElementDataCustomQuery,
  fetchElementDataBasicQuery
} from '@/utils/fetches/dashboard'
import { adjustForSingleValue } from '@/utils/helpers'
// import { logger } from 'utils/logger'

import {
  prepareFiltersBodyRequestFormat,
  convertToUrlFormat
} from '@/features/dashboard/utils/helpers'
import Style from './Visualization.module.css'

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
  const result = fullHeightOfCard - 48 - 18 - 24

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
  const filtersBodyRequest = filters ? prepareFiltersBodyRequestFormat(filters) : []

  useEffect(() => {
    if (element.type !== 'basicQuery') {
      const fetchData = async () => {
        try {
          setIsDataLoading(true)
          const bodyRequest = {
            "filters": filtersBodyRequest
          }
          const fetchedElementData = await fetchElementDataCustomQuery(dashboardId, convertToUrlFormat(element.id), bodyRequest)
          let result = fetchedElementData?.output?.data
          
          setData(result)
          setIsDataLoading(false)
        } catch (err) {
          setIsDataLoading(false)
          toast.error('Upss.. There was a problem to load data')
        }
      }
  
      fetchData()
    } else {
      if (!element.data) {
        const fetchData = async () => {
          try {
            setIsDataLoading(true)
            const measuresWithoutId = element.measures.map(measure => ({ columnName: measure.columnName, operator: measure.operator }))
            const bodyRequest = {
              dimension: element.dimension,
              measures: measuresWithoutId,
              filters: []
            }
            if (element.differential) {
              bodyRequest.differential = element.differential
            }

            const fetchedElementData = await fetchElementDataBasicQuery(element.dbname, element.schema, element.table, bodyRequest)
            let result = fetchedElementData?.data
            setData(result)
            setIsDataLoading(false)
          } catch (err) {
            setIsDataLoading(false)
            toast.error('Upss.. There was a problem to load data')
          }
        }

        fetchData()
      } else {
        setData(element.data)
      }
    }
  }, [
    element?.type,
    JSON.stringify(filtersBodyRequest),
    dashboardId
  ])

  return (
    <>
      {element?.visType === 'singleValue' ? (
          <SingleValue
            data={adjustForSingleValue(data, 'N/A')}
            title={element?.title}
            loading={isDataLoading}
            theme={dashboardTheme}
          />
      ) : (
      <div
        className={Style['grid-item']}
        style={{
          borderRadius: dashboardTheme?.itemGridRadius,
          backgroundColor: dashboardTheme?.itemGridBgColor,
          color: dashboardTheme?.textColor,
          borderColor: dashboardTheme?.itemGridStroke
        }}
      >
        <h3
          className={Style['item-title']}
          style={{
            color: dashboardTheme?.textColor,
            fontFamily: dashboardTheme?.font
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
              height={calcHeight(elementHeight)}
              theme={dashboardTheme}
              locked
            />,
            'lineChart': <AreaChart
            data={data}
            height={calcHeight(elementHeight)}
            theme={dashboardTheme}
            locked
          />,
            'barChart': <CustomBarChart
            data={data}
            height={calcHeight(elementHeight)}
            theme={dashboardTheme}
            locked
          />,
          } [element?.visType]
        }     
      </div>)}
    </>
  )
}
