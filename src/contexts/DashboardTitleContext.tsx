/***
 *
 *   DASHBOARD TITLE CONTEXT
 *
 **********/

import { useState, createContext } from 'react'

export const DashboardTitleContext = createContext('Default dashboard')

export function DashboardTitleProvider({ children }) {
  const [dashboardTitle, setDashboardTitle] = useState('Default dashboard')

  return (
    <DashboardTitleContext.Provider value={{ dashboardTitle, setDashboardTitle }}>
      {children}
    </DashboardTitleContext.Provider>
  )
}
