interface StringObj {
  i: string
}

export function generateUniqueString(arr: Array<StringObj>): string {
  let uniqueString: string

  do {
    uniqueString = generateString()
  } while (existsInArray(uniqueString, arr))

  return uniqueString
}

function generateString(): string {

  return Math.random().toString(36).substring(2, 10)
}

function existsInArray(string: string, arr: Array<StringObj>): boolean {

  return arr.some(obj => obj.i === string)
}

export const prepareLayoutFormatToSend = (layoutData) => {
  if (layoutData?.length > 0) {
    const layoutWithoutIndex = layoutData.map(element => {
      const { i, ...rest } = element

      return (
        {
          static: true,
          ...rest,
          id: i,
        }
      )
    })

    return layoutWithoutIndex
  }
}

export const prepareElementsFormatToSend = (elementsData) => {
  if (elementsData?.length > 0) {
    const ElementsArrWithIndex = elementsData.map(element => {
      element.id = element.i
      delete element.i

      return (
        {
          ...element,
          title: element.text,
        }
      )
    })

    return ElementsArrWithIndex
  }
}

export const prepareLayoutFormat = (layoutData) => {
  if (layoutData?.length > 0) {
    const layoutWithIndex = layoutData.map(element => {
      return (
        {
          ...element,
          i: element.id,
          static: false,
        }
      )
    })

    return layoutWithIndex
  }
}

export const prepareElementsFormat = (elementsData) => {
  if (elementsData?.length > 0) {
    const ElementsArrWithIndex = elementsData.map(element => {
      return (
        {
          ...element,
          i: element.id,
        }
      )
    })

    return ElementsArrWithIndex
  }
}
