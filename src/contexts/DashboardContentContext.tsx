/***
 *
 *   DASHBOARD CONTENT CONTEXT
 *
 **********/

import { useState, createContext, ReactNode } from 'react'

import { palette } from '@/utils/constans'

export interface DashboardContentContextProps {
  dashboardTitle: string
  setDashboardTitle: React.Dispatch<React.SetStateAction<string>>
  dashboardElements: Array<string>
  setDashboardElements: React.Dispatch<React.SetStateAction<Array<string>>>
  dashboardLayout: Array<string>
  setDashboardLayout: React.Dispatch<React.SetStateAction<Array<string>>>
}

export const DashboardContentContext = createContext<DashboardContentContextProps | undefined>(undefined)

interface DashboardContentProviderProps {
  children: ReactNode
}

const initialTheme = {
  name: "Tokenguard",
  primaryColor: "#48BD98",
  secondaryColor: "#0A425E",
  additionalColor: "#E6A627",
  bgColor: "#E2D5D5",
  itemGridRadius: "6px",
  itemGridBgColor: "#FFFFFF",
  font: "Roboto",
  textColor: "#656565",
  itemGridStroke: "#ECECEC",
  chartGradient: true,
  bottomTimeline: true,
}

const initialLayout = []
const initialElements = []

export function DashboardContentProvider({ children }: DashboardContentProviderProps) {
  const [dashboardTitle, setDashboardTitle] = useState('Default dashboard')
  const [dashboardId, setDashboardId] = useState()
  const [dashboardElements, setDashboardElements] = useState(initialElements)
  const [dashboardLayout, setDashboardLayout] = useState(initialLayout)
  const [dashboardFilters, setDashboardFilters] = useState([])
  const [dashboardTheme, setDashboardTheme] = useState(initialTheme)

  return (
    <DashboardContentContext.Provider
      value={{
        dashboardTitle,
        setDashboardTitle,
        dashboardId,
        setDashboardId,
        dashboardElements,
        setDashboardElements,
        dashboardLayout,
        setDashboardLayout,
        dashboardFilters,
        setDashboardFilters,
        dashboardTheme,
        setDashboardTheme
      }}
    >
      {children}
    </DashboardContentContext.Provider>
  )
}
