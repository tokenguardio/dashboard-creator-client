/***
 *
 *   DASHBOARD TITLE CONTEXT
 *
 **********/

import { useState, createContext, ReactNode } from 'react'

export interface DashboardTitleContextProps {
  dashboardTitle: string
  setDashboardTitle: React.Dispatch<React.SetStateAction<string>>
}

export const DashboardTitleContext = createContext<DashboardTitleContextProps | undefined>(undefined)

interface DashboardTitleProviderProps {
  children: ReactNode
}

export function DashboardTitleProvider({ children }: DashboardTitleProviderProps) {
  const [dashboardTitle, setDashboardTitle] = useState('Default dashboard')

  return (
    <DashboardTitleContext.Provider value={{ dashboardTitle, setDashboardTitle }}>
      {children}
    </DashboardTitleContext.Provider>
  )
}
