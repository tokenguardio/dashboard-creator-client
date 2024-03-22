import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Responsive, WidthProvider } from 'react-grid-layout'
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"

import { Icon } from '@/components/icon/Icon'
import { Dropdown } from '@/components/dropdown/Dropdown'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { BlockButtonContext } from '@/contexts/BlockButtonContext'
import { BlockTextContext } from '@/contexts/BlockTextContext'
import { BlockChartContext } from '@/contexts/BlockChartContext'

import { useVerifiedDashboardFilters } from '@/features/dashboard/hooks/useVerifiedDashboardFilters'
import { Visualization } from '@/features/builders/dashboardBuilder/components/Visualization'
import Style from './DesignContent.module.css'

const ResponsiveGridLayout = WidthProvider(Responsive)


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
  const blockChartContext = useContext(BlockChartContext)

  if (!blockButtonContext) {
    throw new Error('Block button context must be used in Provider')
  }

  if (!blockTextContext) {
    throw new Error('Block text context must be used in Provider')
  }

  if (!blockChartContext) {
    throw new Error('Block chart context must be used in Provider')
  }

  const { blockButtonId, setBlockButtonId } = blockButtonContext
  const { blockTextId, setBlockTextId } = blockTextContext
  const { blockChartId, setBlockChartId } = blockChartContext

  const removeElement = (elementId) => {
    const test = dashboardLayout.filter(item => item.i !== elementId)
    const test2 = dashboardElements.filter(item => item.i !== elementId)

    setDashboardElements(test2)
    setDashboardLayout(test)
  }

  const optionsVisualization = [
    {
      label: 'Edit',
      action: (id) => setBlockChartId(id)
    },
    {
      label: 'Delete',
      action: (id) => removeElement(id)
    },
  ]


  const optionsButton = [
    {
      label: 'Edit',
      action: (id) => setBlockButtonId(id)
    },
    {
      label: 'Delete',
      action: (id) => removeElement(id)
    },
  ]

  const optionsText = [
    {
      label: 'Edit',
      action: (id) => setBlockTextId(id)
    },
    {
      label: 'Delete',
      action: (id) => removeElement(id)
    },
  ]

  const onLayoutChange = (layout: any, layouts: any) => {
    setDashboardLayout(layout)
  }

  return (
    <div className={Style['design-content']}>
      {dashboardLayout.length > 0 && dashboardElements.length > 0 ? (
      <ResponsiveGridLayout
        isDraggable
        isRearrangeable
        isResizable
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
                <div className={`${Style['move-wrapper']}`}>
                  <Visualization
                    dashboardId={dashboardId}
                    element={element}
                    elementHeight={item.h}
                    filters={verifiedFilters}
                    dashboardTheme={dashboardTheme}
                  />
                </div>
                <div className={Style['item-more']}>
                  <Dropdown options={optionsVisualization} id={item.i}>
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
                    style={{ color: dashboardTheme?.textColor, fontFamily: dashboardTheme?.font }}
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
                  <Dropdown options={optionsButton} id={item.i}>
                    <Icon name="more" width={16} height={16} />
                  </Dropdown>
                </div>
              </div>
            )
          }
        })}
      </ResponsiveGridLayout>
      ) : null}
    </div>
  )
}
