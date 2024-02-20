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
