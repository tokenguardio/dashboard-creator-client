/***
 *
 *   BLOCK TEXT CONTEXT
 *
 **********/

import { useState, createContext, ReactNode } from 'react'

export interface BlockTextContextProps {
  blockTextId: string | undefined
  setBlockTextId: React.Dispatch<React.SetStateAction<undefined>>
}

export const BlockTextContext = createContext<BlockTextContextProps | undefined>(undefined)

interface BlockTextProviderProps {
  children: ReactNode
}

export function BlockTextProvider({ children }: BlockTextProviderProps) {
  const [blockTextId, setBlockTextId] = useState()

  return (
    <BlockTextContext.Provider value={{ blockTextId, setBlockTextId }}>
      {children}
    </BlockTextContext.Provider>
  )
}
