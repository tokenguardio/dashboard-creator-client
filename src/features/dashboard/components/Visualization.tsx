import React, {
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import { Loader } from '@/components/Loader/Loader'
import { SingleValue } from '@/components/charts/singleValue/SingleValue'
import { AreaChart } from '@/components/charts/areaChart/AreaChart'
import { CustomBarChart } from '@/components/charts/barChart/BarChart'
import { adjustForSingleValue } from '@/utils/helpers'
import {
  fetchElementDataCustomQuery,
  fetchElementDataBasicQuery
} from '@/utils/fetches/dashboard'

import { convertToUrlFormat } from '../utils/helpers'
import { prepareFiltersBodyRequestFormat } from '../utils/helpers'
import Style from './Visualization.module.css'

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
          borderRadius: dashboardTheme.itemGridRadius,
          backgroundColor: dashboardTheme.itemGridBgColor,
          color: dashboardTheme.textColor,
          borderColor: dashboardTheme.strokeColor
        }}
      >
        <h3
          className={Style['item-title']}
          style={{
            color: dashboardTheme.textColor,
            fontFamily: dashboardTheme.font
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
            />,
            'lineChart': <AreaChart
              data={data}
              height={calcHeight(elementHeight)}
              theme={dashboardTheme}
            />,
            'barChart': <CustomBarChart
              data={data}
              height={calcHeight(elementHeight)}
              theme={dashboardTheme}
            />,
          } [element?.visType]
        }         
      </div>
      )}
    </>
  )
}