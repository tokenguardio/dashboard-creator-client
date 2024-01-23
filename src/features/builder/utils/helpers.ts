interface MyObject {
  i: string
}

export function generateUniqueString(arr: Array<MyObject>): string {
  let uniqueString: string

  do {
    uniqueString = generateString()
  } while (existsInArray(uniqueString, arr))

  return uniqueString
}

function generateString(): string {

  return Math.random().toString(36).substring(2, 10)
}

function existsInArray(string: string, arr: Array<MyObject>): boolean {

  return arr.some(obj => obj.i === string)
}
