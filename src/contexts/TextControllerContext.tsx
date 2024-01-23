/***
 *
 *   TEXT CONTROLLER CONTEXT
 *
 **********/

import { useState, createContext, ReactNode } from 'react'

export interface TextControllerContextProps {
  textId: string | undefined
  setTextId: React.Dispatch<React.SetStateAction<undefined>>
}

export const TextControllerContext = createContext<TextControllerContextProps | undefined>(undefined)

interface TextControllerProviderProps {
  children: ReactNode
}

export function TextControllerProvider({ children }: TextControllerProviderProps) {
  const [textId, setTextId] = useState()

  return (
    <TextControllerContext.Provider value={{ textId, setTextId }}>
      {children}
    </TextControllerContext.Provider>
  )
}
  