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