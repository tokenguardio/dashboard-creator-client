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
  name: 'Tokenguard',
  bgColor: palette.gray50,
  itemGridRadius: '6px',
  itemGridBgColor: palette.white,
  fontColor: palette.gray900,
  fontFamily: 'Roboto',
  strokeColor: palette.gray100,
  primaryColor: palette.primary,
  secondaryColor: palette.secondary,
  tertiaryColor: palette.warning600,
  gradient: true,
  dataZoom: true,
}

const dashboardTheme = {
  ...initialTheme
}

export const Dashboard = ({ dashboardData }) => {
  console.log('dashboardData', dashboardData)
  const navigate = useNavigate()
  const [searchParams, _setSearchParams] = useSearchParams()
  const [_dashboardLayout, setDashboardLayout] = useState()
  // const { layout, elements, filters, _id } = dashboardData
  const layout = prepareLayoutFormat(dashboardData.layout)
  const elements = prepareElementsFormat(dashboardData.elements)
  const { verifiedFilters } = useVerifiedDashboardFilters(dashboardData.filters, searchParams, dashboardData._id)
  const onLayoutChange = (layout: any, layouts: any) => {
    setDashboardLayout(layout)
  }

  return (
    <main className={Style['dashboard']}>
      <Title text={dashboardData.title} />
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
          className={Style.layout}
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
                      dashboardTheme={dashboardTheme}
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
                      color: dashboardTheme.fontColor,
                      fontFamily: dashboardTheme.fontFamily
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
                  <Button onClick={() => navigate(element.link)}>
                    {element.text}
                  </Button>
                </div>
              )
            }
          }
          )}
        </ResponsiveGridLayout>
      ) : null}
    </main>

    // <main>
    //   {dashboardLayout.length > 0 && dashboardElements.length > 0 ? (
    //     <ResponsiveGridLayout
    //       layout={dashboardLayout}
    //       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    //       cols={{ lg: 12, md: 12, sm: 2, xs: 2, xxs: 1 }}
    //       onLayoutChange={onLayoutChange}
    //       rowHeight={10}
    //       draggableHandle={`.${Style['move-wrapper']}`}
    //     >
    //       {dashboardLayout.map(item => {
    //         const element = dashboardElements.find(element => element.i === item.i)
    //         if (element?.type === 'areaChart') {
    //           return (
    //             <div key={item.i} data-grid={item}>
    //               <div
    //                 className={`${Style['move-wrapper']} ${Style['grid-item']}`}
    //                 style={{
    //                   borderRadius: dashboardTheme.itemGridRadius,
    //                   backgroundColor: dashboardTheme.itemGridBgColor,
    //                   color: dashboardTheme.fontColor,
    //                   borderColor: dashboardTheme.strokeColor
    //                 }}
    //               >
    //                 <p
    //                   className={Style['item-title']}
    //                   style={{
    //                     color: dashboardTheme.fontColor,
    //                     fontFamily: dashboardTheme.fontFamily
    //                   }}
    //                 >
    //                   {element?.title}
    //                 </p>
    //                 {/* {renderSwitch(element)} */}
    //                 <AreaChart
    //                   data={element.data}
    //                   round={0}
    //                   maxValue={100}
    //                   // locked
    //                   theme={dashboardTheme}
    //                 />
    //               </div>
    //               <div className={Style['item-more']}>
    //                 {/* <Dropdown options={options} id={item.i}>
    //                   <Icon name="more" width={16} height={16} />
    //                 </Dropdown> */}
    //               </div>
    //             </div>
    //           )
    //           } else if (element?.type === 'multiAreaChart') {
    //             return (
    //               <div key={item.i} data-grid={item}>
    //                 <div
    //                   className={`${Style['move-wrapper']} ${Style['grid-item']}`}
    //                   style={{
    //                     borderRadius: dashboardTheme.itemGridRadius,
    //                     backgroundColor: dashboardTheme.itemGridBgColor,
    //                     color: dashboardTheme.fontColor,
    //                     borderColor: dashboardTheme.strokeColor
    //                   }}
    //                 >
    //                   <p
    //                     className={Style['item-title']}
    //                     style={{
    //                       color: dashboardTheme.fontColor,
    //                       fontFamily: dashboardTheme.fontFamily
    //                     }}
    //                   >
    //                     {element?.title}
    //                   </p>
    //                   <MultiAreaChart
    //                     data={element.data}
    //                     round={0}
    //                     maxValue={100}
    //                     locked
    //                     theme={dashboardTheme}
    //                   />
    //                 </div>
    //                 <div className={Style['item-more']}>
    //                   {/* <Dropdown options={options} id={item.i}>
    //                     <Icon name="more" width={16} height={16} />
    //                   </Dropdown> */}
    //                 </div>
    //               </div>
    //             )

    //         } else if (element?.type === 'text') {
    //           return (
    //             <div key={item.i} data-grid={item}>
    //               <div className={Style['move-wrapper']}>
    //                 <div
    //                   dangerouslySetInnerHTML={{ __html: element.text }}
    //                   style={{
    //                     color: dashboardTheme.fontColor,
    //                     fontFamily: dashboardTheme.fontFamily
    //                   }}
    //                 />
    //               </div>
    //               <div className={Style['btn-more']}>
    //                 {/* <Dropdown options={optionsText} id={item.i}>
    //                   <Icon name="more" width={16} height={16} />
    //                 </Dropdown> */}
    //               </div>
    //             </div>
    //           )
    //         } else if (element?.type === 'button') { 
    //           return (
    //             <div key={item.i} data-grid={item}>
    //               <div className={Style['btn-wrapper']}>
    //                 {element.text}
    //               </div>
    //               <div className={Style['btn-more']}>
    //                 {/* <Dropdown options={options} id={item.i}>
    //                   <Icon name="more" width={16} height={16} />
    //                 </Dropdown> */}
    //               </div>
    //             </div>
    //           )
    //         }
    //       })}
    //     </ResponsiveGridLayout>
    //   ) : null}
    // </main>
  )
}