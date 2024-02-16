import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Responsive, WidthProvider } from 'react-grid-layout'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
const ResponsiveGridLayout = WidthProvider(Responsive)

import { AreaChart } from '@/components/charts/areaChart/AreaChart'
import { MultiAreaChart } from '@/components/charts/multiAreaChart/MultiAreaChart'
// import { Icon } from '@/components/icon/Icon'
// import { Button } from '@/components/button/Button'
// import { Dropdown } from '@/components/dropdown/Dropdown'

import Style from './Dashboard.module.css'

import { palette } from '@/utils/constans'

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
  name: 'Tokenguard',
  bgColor: palette.gray50,
  itemGridRadius: '6px',
  itemGridBgColor: palette.white,
  fontColor: palette.gray900,
  fontFamily: 'Roboto',
  strokeColor: palette.secondary,
  primaryColor: palette.primary,
  secondaryColor: palette.secondary,
  tertiaryColor: palette.warning600,
  gradient: true,
  dataZoom: true,
}

const initialLayout = [
  { i: "a", x: 0, y: 0, w: 3, h: 15, static: true },
  { i: "b", x: 3, y: 0, w: 3, h: 15, static: true },
  { i: "c", x: 0, y: 0, w: 1, h: 2, static: true  },
  { i: "d", x: 1, y: 9, w: 2, h: 3, static: true  },
  { i: "f", x: 3, y: 2, w: 3, h: 15, static: true  },
]
const initialElements = [
  {
    title: 'Another chart',
    type: 'areaChart',
    i: 'a',
    data: exampleData,
  },
  {
    title: 'multi test chart',
    type: 'areaChart',
    i: 'f',
    data: exampleData,
  },
  {
    title: 'Fake chart test',
    type: 'areaChart',
    i: 'b',
    data: exampleData,
  },
  {
    text: 'Test Button',
    type: 'button',
    i: 'c',
    link: 'https://app.tokenguard.io',
  },
  {
    text: 'test text fdsfsdfsfsdfs',
    type: 'text',
    i: 'd',
  },
]

const initialDashboardLayout = [
  ...initialLayout
]
const dashboardElements = [
  ...initialElements
]
const dashboardTheme = {
  ...initialTheme
}

export const Dashboard = () => {
  const [dashboardLayout, setDashboardLayout] = useState(initialDashboardLayout)
  // const { id } = useParams()

  // useEffect(() => {
  //   // do request for getting dashboard data
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.API_BASE_URL}/api/dashboard/${id}`)
  //       console.log('response', response)
  //     } catch (err) {
  //       console.log('test 24234')
  //     }
  //   }

  //   fetchData()
  // }, [id])

  const onLayoutChange = (layout: any, layouts: any) => {
    setDashboardLayout(layout)
  };

  return (
    <main>
      {dashboardLayout.length > 0 && dashboardElements.length > 0 ? (
        <ResponsiveGridLayout
          layout={dashboardLayout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 2, xs: 2, xxs: 1 }}
          onLayoutChange={onLayoutChange}
          rowHeight={10}
          draggableHandle={`.${Style['move-wrapper']}`}
        >
          {dashboardLayout.map(item => {
            const element = dashboardElements.find(element => element.i === item.i)
            if (element?.type === 'areaChart') {
              return (
                <div key={item.i} data-grid={item}>
                  <div
                    className={`${Style['move-wrapper']} ${Style['grid-item']}`}
                    style={{
                      borderRadius: dashboardTheme.itemGridRadius,
                      backgroundColor: dashboardTheme.itemGridBgColor,
                      color: dashboardTheme.fontColor,
                      borderColor: dashboardTheme.strokeColor
                    }}
                  >
                    <p
                      className={Style['item-title']}
                      style={{
                        color: dashboardTheme.fontColor,
                        fontFamily: dashboardTheme.fontFamily
                      }}
                    >
                      {element?.title}
                    </p>
                    {/* {renderSwitch(element)} */}
                    <AreaChart
                      data={element.data}
                      round={0}
                      maxValue={100}
                      // locked
                      theme={dashboardTheme}
                    />
                  </div>
                  <div className={Style['item-more']}>
                    {/* <Dropdown options={options} id={item.i}>
                      <Icon name="more" width={16} height={16} />
                    </Dropdown> */}
                  </div>
                </div>
              )
              } else if (element?.type === 'multiAreaChart') {
                return (
                  <div key={item.i} data-grid={item}>
                    <div
                      className={`${Style['move-wrapper']} ${Style['grid-item']}`}
                      style={{
                        borderRadius: dashboardTheme.itemGridRadius,
                        backgroundColor: dashboardTheme.itemGridBgColor,
                        color: dashboardTheme.fontColor,
                        borderColor: dashboardTheme.strokeColor
                      }}
                    >
                      <p
                        className={Style['item-title']}
                        style={{
                          color: dashboardTheme.fontColor,
                          fontFamily: dashboardTheme.fontFamily
                        }}
                      >
                        {element?.title}
                      </p>
                      <MultiAreaChart
                        data={element.data}
                        round={0}
                        maxValue={100}
                        locked
                        theme={dashboardTheme}
                      />
                    </div>
                    <div className={Style['item-more']}>
                      {/* <Dropdown options={options} id={item.i}>
                        <Icon name="more" width={16} height={16} />
                      </Dropdown> */}
                    </div>
                  </div>
                )

            } else if (element?.type === 'text') {
              return (
                <div key={item.i} data-grid={item}>
                  <div className={Style['move-wrapper']}>
                    <div
                      dangerouslySetInnerHTML={{ __html: element.text }}
                      style={{ color: dashboardTheme.fontColor, fontFamily: dashboardTheme.fontFamily }}
                    />
                  </div>
                  <div className={Style['btn-more']}>
                    {/* <Dropdown options={optionsText} id={item.i}>
                      <Icon name="more" width={16} height={16} />
                    </Dropdown> */}
                  </div>
                </div>
              )
            } else if (element?.type === 'button') { 
              return (
                <div key={item.i} data-grid={item}>
                  <div className={Style['btn-wrapper']}>
                    {element.text}
                  </div>
                  <div className={Style['btn-more']}>
                    {/* <Dropdown options={options} id={item.i}>
                      <Icon name="more" width={16} height={16} />
                    </Dropdown> */}
                  </div>
                </div>
              )
            }
          })}
        </ResponsiveGridLayout>
      ) : null}
    </main>
  )
}