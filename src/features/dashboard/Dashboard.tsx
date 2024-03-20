import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Responsive, WidthProvider } from 'react-grid-layout'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
const ResponsiveGridLayout = WidthProvider(Responsive)

import { palette } from '@/utils/constans'
import { Title } from '@/components/title/Title'
import { Button } from '@/components/button/Button'

import { Visualization } from './components/Visualization'
import {
  prepareElementsFormat,
  prepareLayoutFormat,
} from './utils/helpers'
import { useVerifiedDashboardFilters } from './hooks/useVerifiedDashboardFilters'

import Style from './Dashboard.module.css'

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

const dashboardTheme = {
  ...initialTheme
}

export const Dashboard = ({ dashboardData }) => {
  const navigate = useNavigate()
  const [searchParams, _setSearchParams] = useSearchParams()
  const [_dashboardLayout, setDashboardLayout] = useState()
  // const { layout, elements, filters, _id } = dashboardData
  const layout = prepareLayoutFormat(dashboardData.layout, true)
  const elements = prepareElementsFormat(dashboardData.elements)
  const { verifiedFilters } = useVerifiedDashboardFilters(dashboardData.filters, searchParams, dashboardData._id)
  const onLayoutChange = (layout: any, layouts: any) => {
    setDashboardLayout(layout)
  }

  return (
    <main className={Style['dashboard']} style={{ backgroundColor: dashboardData.theme.bgColor }}>
      <div className={Style['layout']}><Title text={dashboardData.title} /></div>
      {/* {verifiedFilters && verifiedFilters.length > 0 && <DashboardFilters filters={verifiedFilters} dashboardId={dashboardCreator._id} />} */}
      {layout?.length > 0 && elements?.length > 0 ? (
        <ResponsiveGridLayout
          layout={_dashboardLayout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 2, xs: 2, xxs: 1 }}
          onLayoutChange={onLayoutChange}
          rowHeight={10}
          allowOverlap={false}
          preventCollision={true}
          className={Style['layout']}
          compactType="horizontal"
        >
          {layout.map((item) => {
            const element = elements.find(element => element.i === item.i)
            if (element?.type !== 'text' && element?.type !== 'button') {
              return (
                <div
                  key={item.i}
                  data-grid={item}
                >
                  {/* {verifiedFilters && verifiedFilters.length > 0 ? ( */}
                    <Visualization
                      dashboardId={dashboardData?.temporary_id || dashboardData._id}
                      element={element}
                      elementHeight={item.h}
                      filters={verifiedFilters}
                      dashboardTheme={dashboardData?.theme}
                    />                    
                    {/* )  : null
                  } */}
                </div>
              )
            } else if (element.type === 'text') {
              return (
                <div
                  key={item.i}
                  data-grid={item}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: element.text }}
                    style={{
                      color: dashboardTheme.textColor,
                      fontFamily: dashboardData?.theme?.font
                    }}
                  />
                </div>
              )
            } else if (element.type === 'button') { 
              return (
                <div
                  key={item.i}
                  data-grid={item}
                >
                  <a href={element.link}>
                    <Button>
                      {element.text}
                    </Button>
                  </a>
                </div>
              )
            }
          }
          )}
        </ResponsiveGridLayout>
      ) : null}
    </main>
  )
}