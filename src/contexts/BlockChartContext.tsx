/***
 *
 *   BLOCK CHART CONTEXT
 *
 **********/

import { useState, createContext, ReactNode } from 'react'

export interface BlockChartContextProps {
  blockChartId: string | undefined | null
  setBlockChartId: React.Dispatch<React.SetStateAction<undefined>>
}

export const BlockChartContext = createContext<BlockChartContextProps | undefined | null>(undefined)

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
  