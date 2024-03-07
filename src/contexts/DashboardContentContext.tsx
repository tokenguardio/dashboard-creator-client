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
}

export const DashboardContentContext = createContext<DashboardContentContextProps | undefined>(undefined)

interface DashboardContentProviderProps {
  children: ReactNode
}

const exampleMultiData = {
    "blockchain": [
        {
            "date": "2023-10-23",
            "value": 57.41542716801678
        },
        {
            "date": "2023-10-30",
            "value": 59.67474860615694
        },
        {
            "date": "2023-11-06",
            "value": 69.22159156214316
        },
        {
            "date": "2023-11-13",
            "value": 68.97471439966192
        },
        {
            "date": "2023-11-20",
            "value": 72.38079594809182
        },
        {
            "date": "2023-11-27",
            "value": 61.282458626314536
        },
        {
            "date": "2023-12-04",
            "value": 61.245647012777525
        },
        {
            "date": "2023-12-11",
            "value": 76.25880037389283
        },
        {
            "date": "2023-12-18",
            "value": 61.41191102338581
        },
        {
            "date": "2023-12-25",
            "value": 57.50574464171003
        },
        {
            "date": "2024-01-01",
            "value": 58.44950661265007
        },
        {
            "date": "2024-01-08",
            "value": 58.57057650273938
        }
    ],
    "ethereum": [
        {
            "date": "2023-10-23",
            "value": 54.765459795328965
        },
        {
            "date": "2023-10-30",
            "value": 57.58722656921154
        },
        {
            "date": "2023-11-06",
            "value": 68.41047407629
        },
        {
            "date": "2023-11-13",
            "value": 68.17751468234059
        },
        {
            "date": "2023-11-20",
            "value": 65.48271816318146
        },
        {
            "date": "2023-11-27",
            "value": 64.57380287602597
        },
        {
            "date": "2023-12-04",
            "value": 63.472821815621174
        },
        {
            "date": "2023-12-11",
            "value": 57.98157189719393
        },
        {
            "date": "2023-12-18",
            "value": 56.89976445926588
        },
        {
            "date": "2023-12-25",
            "value": 50.81267424226618
        },
        {
            "date": "2024-01-01",
            "value": 48.63621618992611
        },
        {
            "date": "2024-01-08",
            "value": 52.96808261795971
        }
    ]
}


//////////////
const exampleData = [
  {
      "date": "2023-10-09",
      "value": 69.1691314364788
  },
  {
      "date": "2023-10-16",
      "value": 77.54612133569907
  },
  {
      "date": "2023-10-23",
      "value": 85.8398248465142
  },
  {
      "date": "2023-10-30",
      "value": 77.41912333881965
  },
  {
      "date": "2023-11-06",
      "value": 73.71463997814227
  },
  {
      "date": "2023-11-13",
      "value": 75.32278939691057
  },
  {
      "date": "2023-11-20",
      "value": 81.73011016487291
  },
  {
      "date": "2023-11-27",
      "value": 90.81311645835974
  },
  {
      "date": "2023-12-04",
      "value": 85.85117492807268
  },
  {
      "date": "2023-12-11",
      "value": 82.64861644027394
  },
  {
      "date": "2023-12-18",
      "value": 74.68530869210541
  },
  {
      "date": "2023-12-25",
      "value": 63.156329422187916
  },
  {
      "date": "2024-01-01",
      "value": 55.47434486617284
  }
]

const initialTheme = {
//   name: 'Tokenguard',
//   bgColor: palette.gray50,
//   itemGridRadius: '6px',
//   itemGridBgColor: palette.white,
//   fontColor: palette.gray900,
//   fontFamily: 'Roboto',
//   strokeColor: palette.secondary,
//   primaryColor: palette.primary,
//   secondaryColor: palette.secondary,
//   tertiaryColor: palette.warning600,
//   gradient: true,
//   dataZoom: true,
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

const initialLayout = [
//   { i: "a", x: 0, y: 0, w: 3, h: 15 },
//   { i: "b", x: 3, y: 0, w: 3, h: 15 },
//   { i: "c", x: 0, y: 0, w: 1, h: 2 },
//   { i: "d", x: 1, y: 9, w: 2, h: 3 },
//   { i: "f", x: 3, y: 2, w: 3, h: 15 },
]
const initialElements = [
//   {
//     title: 'Another chart',
//     type: 'areaChart',
//     i: 'a',
//     data: exampleData,
//   },
//   {
//     title: 'multi test chart',
//     type: 'multiAreaChart',
//     i: 'f',
//     data: exampleMultiData,
//   },
//   {
//     title: 'Fake chart test',
//     type: 'areaChart',
//     i: 'b',
//     data: exampleData,
//   },
//   {
//     text: 'Test Button',
//     type: 'button',
//     i: 'c',
//     link: 'https://app.tokenguard.io',
//   },
//   {
//     text: 'test text fdsfsdfsfsdfs',
//     type: 'text',
//     i: 'd',
//   },
]

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
