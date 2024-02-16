/***
 *
 *   BLOCK BUTTON CONTEXT
 *
 **********/

import { useState, createContext, ReactNode } from 'react'

export interface BlockButtonContextProps {
  blockButtonId: string | undefined
  setBlockButtonId: React.Dispatch<React.SetStateAction<undefined>>
}

export const BlockButtonContext = createContext<BlockButtonContextProps | undefined>(undefined)

interface BlockButtonProviderProps {
  children: ReactNode
}

export function BlockButtonProvider({ children }: BlockButtonProviderProps) {
  const [blockButtonId, setBlockButtonId] = useState()

  return (
    <BlockButtonContext.Provider value={{ blockButtonId, setBlockButtonId }}>
      {children}
    </BlockButtonContext.Provider>
  )
}
  