export const prepareLayoutFormat = (layoutData) => {
  if (layoutData?.length > 0) {
    const layoutWithIndex = layoutData.map(element => {
      return (
        {
          ...element,
          i: element.id,
          static: true,
        }
      )
    })

    return layoutWithIndex
  }
}

export const prepareElementsFormat = (elementsData) => {
  if (elementsData?.length > 0) {
    const elementsArrWithIndex = elementsData.map(element => {
      return (
        {
          ...element,
          i: element.id,
        }
      )
    })

    return elementsArrWithIndex
  }
}

export const convertToUrlFormat = (string) => string.replace(/ /g, '%20')

export const prepareFiltersBodyRequestFormat = (data) => {

  const result = data.map(item => {
    if (item.component === 'multiselect') {
      return (
        {
          name: item.name,
          value: item.value
        }
      )
    } else {
      return (
        {
          name: item.name,
          value: item.value
        }
      )
    }
  })

  return result
}