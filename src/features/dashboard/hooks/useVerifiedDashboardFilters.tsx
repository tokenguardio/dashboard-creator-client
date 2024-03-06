import { useState, useMemo } from 'react'

/***
 *
 *   useFiltersParam hook
 * 
 **********/

function toSnakeCase(str) {
  return decodeURIComponent(str)
          .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
          .replace(/[\W_]+/g, '_')
          .replace(/^_+|_+$/g, '')
}

function snakeCaseKeysInArray(arr) {
  return arr.map(obj => {
      const newObj = {}

      for (let key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const snakeCaseKey = toSnakeCase(key)
          newObj[snakeCaseKey] = obj[key]
        }
      }

      return newObj
  })
}

function commonPartOfStringAndObjectArray(array1, array2) {
  let valuesArray2 = new Set(array2.map(obj => obj.value));

  return array1.filter(str => valuesArray2.has(str));
}

export const useVerifiedDashboardFilters = (filters, searchParams) => {
  const [verifiedFilters, setVerifiedFilters] = useState()

  // getting and preparing queryParams
  const formattedParams = useMemo(() => {
    let params = []
    if (searchParams) {
      searchParams.forEach((value, key) => {
        params.push({ [key]: value })
      })
    }

    return snakeCaseKeysInArray(params)
  }, [searchParams, filters])


  const _checkFilters = useMemo(() => {
    if (filters && filters.length > 0) {
        const testFilters = filters.map((filter) => {
          const listOfCommonValue = formattedParams.filter((item) =>
            Object.prototype.hasOwnProperty.call(item, filter.name)
          )
          let isValid = true
          if (filter.component === 'select') {
            if (listOfCommonValue.length > 0) {
              const isEqual = filter.options.some(function (item) {
                return item.value === listOfCommonValue[0][filter.name];
              })

              if (!isEqual) {
                isValid = false
              }
            }
          }
          let result
          if (filter.component === 'multiselect') {
            if (listOfCommonValue.length > 0) {
              const paramName = Object.keys(listOfCommonValue[0]);
              const values = listOfCommonValue[0][paramName].split(',')
              result = commonPartOfStringAndObjectArray(values, filter.options)
            }
          }
          if (listOfCommonValue.length > 0 && isValid && filter.component === 'multiselect') {
            return {
              ...filter,
              value: result,
            }
          } else if (listOfCommonValue.length > 0 && isValid && filter.component !== 'multiselect') {
            return {
              ...filter,
              value: listOfCommonValue[0][filter.name],
            }
          } else if (filter.component === 'multiselect') {
            return (
              {
                ...filter,
                value: [" "],
              }
            )
          } else {
            return {
              ...filter,
              value: filter.defaultValue,
            }
          }
        })
        setVerifiedFilters(testFilters)
      }
  }, [filters, formattedParams]);

  return {
    verifiedFilters: verifiedFilters,
  }
}