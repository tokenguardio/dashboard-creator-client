/***
 *
 *   DASHBOARD BUILDER
 *
 **********/

import { useContext, useEffect } from 'react'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { BlockButtonContext } from '@/contexts/BlockButtonContext'
import { BlockTextContext } from '@/contexts/BlockTextContext'
import { BlockChartContext } from '@/contexts/BlockChartContext'
import { ChartBuilder } from '@/features/builders/chartBuilder/ChartBuilder'

import { DesignContainer } from './components/designContainer/DesignContainer'
import { DesignContent } from './components/designContent/DesignContent'
import { ActionBar } from './components/actionBar/ActionBar'
import { Toolbar } from './components/toolbar/Toolbar'
import { AddNewElement } from './components/addNewElement/AddNewElement'
import { DashboardTitle } from './components/dashboardTitle/DashboardTitle'
import { BlockButtonModifier } from './components/blockButtonModifier/BlockButtonModifier'
import { BlockTextModifier } from './components/blockTextModifier/BlockTextModifier'
import Style from './DashboardBuilder.module.css'


export function DashboardBuilder() {
  const dashboardContent = useContext(DashboardContentContext)
  const { blockButtonId } = useContext(BlockButtonContext)
  const { blockTextId } = useContext(BlockTextContext)
  const { blockChartId } = useContext(BlockChartContext)

  // useEffect(() => {
  //   console.log('dashboardId', dashboardId)
  // }, [dashboardId])

  if (blockChartId) {
    return (
      <main className={Style['content-container']}>
        <DashboardTitle />
        <ChartBuilder />
      </main>
    )
  }

  if (dashboardContent?.dashboardElements?.length === 0) {
    return (
      <main className={Style['content-container']}>
        <DashboardTitle />
        <AddNewElement title />
        {blockButtonId && <BlockButtonModifier />}
        {blockTextId && <BlockTextModifier />}
      </main>
    )
  }

  return (
    <main className={Style['builder-container']}>
      <DesignContainer>
        <DashboardTitle />
        <DesignContent />
      </DesignContainer>
      <ActionBar />
      <Toolbar />
      {blockButtonId && <BlockButtonModifier />}
      {blockTextId && <BlockTextModifier />}
    </main>
  )
}
