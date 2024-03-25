export const adjustForSingleValue = (data: unknown, defaultValue: string | number) => {
  if (typeof data === 'number' || typeof data === 'string') {
    return data
  }

  if (Array.isArray(data) && data?.length > 0) {
    const keys = Object.keys(data[0])
    const measures = keys.filter(item => item !== 'dimension')
    if (measures.length === 1) {
      const property = measures[0]
      const lastIndex = data.length - 1
      // getting last result
      const result = data[lastIndex][property]

      return result
    }
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data)
    const measures = keys.filter(item => item !== 'dimension')
    if (measures.length === 1) {
      const property = measures[0]
      const result = data[property]
      
      return result
    }
  }

  return defaultValue ? defaultValue : false
}

export const checkDifferential = (data) => {
  const keys = Object.keys(data[0])
  if (keys.includes('differential')) {
    const mainMeasure = keys.filter(item => item !== 'dimension' && item !== 'differential')[0]

    const prepareData = (arr, property) => {
      let uniqueKeys = new Set()

      arr.forEach(obj => {
        if (obj.hasOwnProperty(property)) {
          uniqueKeys.add(obj[property]);
        }
      })

      return Array.from(uniqueKeys).sort()
    }
  
    const preparedDimension = prepareData(data, 'dimension').sort()
    const preparedDifferential = prepareData(data, 'differential').sort()
    let result = []

    preparedDimension.forEach(dimension => {
      let point = {
        dimension: dimension,
      }

      preparedDifferential.forEach(measure => {
        point[measure] = data.filter(item => item.dimension === dimension && item.differential === measure)[0]?.[mainMeasure]
      })

      result.push(point)
    })

    return result
  } else {

    return data
  }
}