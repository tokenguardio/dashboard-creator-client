/***
 *
 *   BLOCK CHART CONTEXT
 *
 **********/

import { useState, createContext, ReactNode } from 'react'

export interface BlockChartContextProps {
  blockChartId: string | undefined
  setBlockChartId: React.Dispatch<React.SetStateAction<undefined>>
}

export const BlockChartContext = createContext<BlockChartContextProps | undefined>(undefined)

interface BlockChartProviderProps {
  children: ReactNode
}

export function BlockChartProvider({ children }: BlockChartProviderProps) {
  const [blockChartId, setBlockChartId] = useState()

  return (
    <BlockChartContext.Provider value={{ blockChartId, setBlockChartId }}>
      {children}
    </BlockChartContext.Provider>
  )
}
  