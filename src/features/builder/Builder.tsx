/***
 *
 *   BUILDER
 *
 **********/

import { useContext } from 'react'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { BlockButtonContext } from '@/contexts/BlockButtonContext'
import { BlockTextContext } from '@/contexts/BlockTextContext'

import { DesignContainer } from './components/designContainer/DesignContainer'
import { DesignContent } from './components/designContent/DesignContent'
import { ActionBar } from './components/actionBar/ActionBar'
import { Toolbar } from './components/toolbar/Toolbar'
import { AddNewElement } from './components/addNewElement/AddNewElement'
import { DashboardTitle } from './components/dashboardTitle/DashboardTitle'
import { BlockButtonModifier } from './components/blockButtonModifier/BlockButtonModifier'
import { BlockTextModifier } from './components/blockTextModifier/BlockTextModifier'
import Style from './Builder.module.css'

export function Builder() {
  const dashboardContent = useContext(DashboardContentContext)
  const { blockButtonId } = useContext(BlockButtonContext)
  const { blockTextId } = useContext(BlockTextContext)

  if (dashboardContent?.dashboardElements?.length === 0) {
    return (
      <main className={Style['builder-container']}>
        <AddNewElement />
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
