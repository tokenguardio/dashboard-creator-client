/***
 *
 *   BUTTON CONTROLLER CONTEXT
 *
 **********/

import { useState, createContext, ReactNode } from 'react'

export interface ButtonControllerContextProps {
  buttonId: string | undefined
  setButtonId: React.Dispatch<React.SetStateAction<undefined>>
}

export const ButtonControllerContext = createContext<ButtonControllerContextProps | undefined>(undefined)

interface ButtonControllerProviderProps {
  children: ReactNode
}

export function ButtonControllerProvider({ children }: ButtonControllerProviderProps) {
  const [buttonId, setButtonId] = useState()

  return (
    <ButtonControllerContext.Provider value={{ buttonId, setButtonId }}>
      {children}
    </ButtonControllerContext.Provider>
  )
}
  