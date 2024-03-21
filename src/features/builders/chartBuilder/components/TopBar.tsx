import React, { useState, useContext } from 'react'

import { BlockChartContext } from '@/contexts/BlockChartContext'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { TextInput } from '@/components/input/TextInput'
import { IconButton } from '@/components/button/IconButton'
import { Icon } from '@/components/icon/Icon'
import { Button } from '@/components/button/Button'
import { LinkButton } from '@/components/button/LinkButton'

import Style from './TopBar.module.css'

export const TopBar = ({
  result,
  chartTitle,
  setChartTitle,
  chartType,
  selectedData,
  resetBuilder,
  databaseParam,
  schemaParam,
  tableParam,
  handleQuery
}) => {
  const [editing, setEditing] = useState<boolean>(false)
  const blockChartContext = useContext(BlockChartContext)
  const dashboardContentContext = useContext(DashboardContentContext)
  
  if (!blockChartContext) {
    throw Error('Chart context has to be in provider')
  }

  if (!dashboardContentContext) {
    throw Error('Dashboard context has to be in provider')
  }

  const { blockChartId, setBlockChartId } = blockChartContext
  const {
    dashboardElements,
    setDashboardElements,
    dashboardLayout,
    setDashboardLayout
  } = dashboardContentContext

  const saveElement = (blockChartId) => {
    if (dashboardElements.some(obj => obj?.id === blockChartId)) {
      const updatedDashboardElements = dashboardElements.map(element => {
        if (element.id === blockChartId) {
          const elementToSave = {
            title: chartTitle,
            dimension: selectedData[0].dimension[0],
            measures: selectedData[0].measures,
            dbname: databaseParam,
            schema: schemaParam,
            table: tableParam,
            visType: chartType,
            data: result
          }
          if (selectedData[0].dimension[1]) {
            elementToSave.differential = selectedData[0].dimension[1]
          }
          return (
            {
              ...element,
              ...elementToSave
            }
          )
        } else {
          return element
        }
      })
      setDashboardElements(updatedDashboardElements)
      setBlockChartId(null)
    } else {
      const elementToSave = {
        type: 'basicQuery',
        id: blockChartId,
        i: blockChartId,
        title: chartTitle,
        dimension: selectedData[0].dimension[0],
        measures: selectedData[0].measures,
        dbname: databaseParam,
        schema: schemaParam,
        table: tableParam,
        // queryId: 0,
        visType: chartType,
        data: result
      }
      if (selectedData[0].dimension[1]) {
        elementToSave.differential = selectedData[0].dimension[1]
      }
      setDashboardElements([
        ...dashboardElements,
        elementToSave
      ])
      setDashboardLayout(
        [
          ...dashboardLayout,
          {
            id: blockChartId,
            i: blockChartId,
            static: false,
            x: 0,
            y: 0,
            h: 24,
            w: 4
          }
        ]
      )
      setBlockChartId(null)
    }
  }

  const ref = useOutsideClick(() => {
    setEditing(false)
  })

  const handleClick = () => {
    setEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartTitle(e.target.value)
  }

  const handleBlur = () => {
    setEditing(false)
  }

  return (
    <div className={Style['topbar']}>
      {!result && (
        <>
          <p>Choose an explore</p>
          <IconButton
            onClick={() => setBlockChartId(null)}
            icon={<Icon name="exit" height="1.6rem" width="1.6rem" />}
          />
        </>
      )}
      {result && (
        <>
          <div
            className={Style['chart-title-container']}
            ref={ref}
          >
            {editing ? (
              <TextInput
                name="chart-title"
                value={chartTitle}
                change={handleChange}
                blur={handleBlur}
              />
            ) : (
              <p className={Style['chart-title']}>{chartTitle}</p>
            )}
            <IconButton
              onClick={handleClick}
              icon={<Icon name="edit" height="1.6rem" width="1.6rem" />}
            />
          </div>
          <div className={Style['builder-settings-bar']}>
            <LinkButton onClick={() => resetBuilder()}>
              Cancel
            </LinkButton>
            <Button
              size="small"
              variant="outline"
              onClick={() => saveElement(blockChartId)}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="solid"
              onClick={() => handleQuery()}
            >
              Run
            </Button>
          </div>
        </>
      )}
    </div>
  )
}