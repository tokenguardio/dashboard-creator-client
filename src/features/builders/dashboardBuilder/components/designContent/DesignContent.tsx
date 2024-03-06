import { useState, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Style from './DesignContent.module.css'
import { TextEditor } from '../textEditor/TextEditor'
import { Responsive, WidthProvider } from "react-grid-layout"
import { AreaChart } from '@/components/charts/areaChart/AreaChart'
// import { MultiAreaChart } from '@/components/charts/multiAreaChart/MultiAreaChart'
import { Icon } from '@/components/icon/Icon'
import { Button } from '@/components/button/Button'
import { Dropdown } from '@/components/dropdown/Dropdown'
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import {BlockButtonContext } from '@/contexts/BlockButtonContext'
import { BlockTextContext } from '@/contexts/BlockTextContext'
import { useVerifiedDashboardFilters } from '@/features/dashboard/hooks/useVerifiedDashboardFilters'
const ResponsiveGridLayout = WidthProvider(Responsive)

import { Visualization } from '@/features/builders/dashboardBuilder/components/Visualization'


export const DesignContent = () => {
  const {
    dashboardElements,
    dashboardId,
    setDashboardElements,
    setDashboardLayout,
    dashboardLayout,
    dashboardFilters,
    dashboardTheme
  } = useContext(DashboardContentContext)
  const [searchParams, _setSearchParams] = useSearchParams()
  const { verifiedFilters } = useVerifiedDashboardFilters(dashboardFilters, searchParams, dashboardId)

  const blockButtonContext = useContext(BlockButtonContext)
  const blockTextContext = useContext(BlockTextContext)

  if (!blockButtonContext) {
    throw new Error('Block button context must be used in Provider')
  }

  if (!blockTextContext) {
    throw new Error('Block text context must be used in Provider')
  }

  const { blockButtonId, setBlockButtonId } = blockButtonContext
  const { blockTextId, setBlockTextId } = blockTextContext

  const removeElement = (elementId) => {
    const test = dashboardLayout.filter(item => item.i !== elementId)
    const test2 = dashboardElements.filter(item => item.i !== elementId)

    setDashboardElements(test2)
    setDashboardLayout(test)
  }


  const options = [
    {
      name: 'edit',
      action: (id) => setBlockButtonId(id)
    },
    {
      name: 'delete',
      action: (id) => removeElement(id)
    },
  ]

  const optionsText = [
    {
      name: 'edit',
      action: (id) => setBlockTextId(id)
    },
    {
      name: 'delete',
      action: (id) => removeElement(id)
    },
  ]

  // function renderSwitch(item) {
  //   switch(item?.type) {
  //     case 'text':
  //       return <TextEditor />;
  //     case 'areaChart':
  //       return (
  //         <AreaChart
  //           data={item.data}
  //           round={0}
  //           maxValue={100}
  //           locked
  //         />
  //       )
  //     case 'button':
  //       return 'bar';
  //     default:
  //       return null;
  //   }
  // }
  function renderSwitch(item) {
    switch(item?.type) {
      case 'text':
        return <TextEditor />;
      case 'areaChart':
        return (
          <AreaChart
            data={item.data}
            round={0}
            maxValue={100}
            locked
            theme={dashboardTheme}
          />
        )
      case 'button':
        return <Button onClick={() => console.log('test button')}>{item.text}</Button>;
      default:
        return null;
    }
  }

  const onLayoutChange = (layout: any, layouts: any) => {
    setDashboardLayout(layout)
  };

  return (
    <div className={Style['design-content']}>
      {dashboardLayout.length > 0 && dashboardElements.length > 0 ? (
      <ResponsiveGridLayout
        // className="layout"
        // className={Style['grid']}
        layout={dashboardLayout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 2, xs: 2, xxs: 1 }}
        onLayoutChange={onLayoutChange}
        rowHeight={10}
        draggableHandle={`.${Style['move-wrapper']}`}
      >
         {dashboardLayout.map((item) => {
            const element = dashboardElements.find(element => element.i === item.i)
            if (element?.type !== 'text' && element?.type !== 'button') {
              return (
                <div
                  key={item.i}
                  data-grid={item}
                >
                  <Visualization
                    dashboardId={dashboardId}
                    element={element}
                    elementHeight={item.h}
                    filters={verifiedFilters}
                    dashboardTheme={dashboardTheme}
                  />
                  <div className={Style['item-more']}>
                    <Dropdown options={options} id={item.i}>
                      <Icon name="more" width={16} height={16} />
                    </Dropdown>
                  </div>                    
                </div>
              )
            } else if (element?.type === 'text') {
              return (
                <div key={item.i} data-grid={item}>
                  <div className={Style['move-wrapper']}>
                    <div
                      dangerouslySetInnerHTML={{ __html: element.text }}
                      style={{ color: dashboardTheme?.fontColor, fontFamily: dashboardTheme?.fontFamily }}
                    />
                  </div>
                  <div className={Style['btn-more']}>
                    <Dropdown options={optionsText} id={item.i}>
                      <Icon name="more" width={16} height={16} />
                    </Dropdown>
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
                    <Dropdown options={options} id={item.i}>
                      <Icon name="more" width={16} height={16} />
                    </Dropdown>
                  </div>
                </div>
              )
            }
          }
          )}
        {/* {dashboardLayout.map(item => {
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
                  <AreaChart
                    data={element.data}
                    round={0}
                    maxValue={100}
                    locked
                    theme={dashboardTheme}
                  />
                </div>
                <div className={Style['item-more']}>
                  <Dropdown options={options} id={item.i}>
                    <Icon name="more" width={16} height={16} />
                  </Dropdown>
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
                    <Dropdown options={options} id={item.i}>
                      <Icon name="more" width={16} height={16} />
                    </Dropdown>
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
                  <Dropdown options={optionsText} id={item.i}>
                    <Icon name="more" width={16} height={16} />
                  </Dropdown>
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
                  <Dropdown options={options} id={item.i}>
                    <Icon name="more" width={16} height={16} />
                  </Dropdown>
                </div>
              </div>
            )
          }
        })} */}
      </ResponsiveGridLayout>
      ) : null}
    </div>
  )
}
