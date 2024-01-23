/***
 *
 *   BUILDER
 *
 **********/

import { useContext } from 'react'
import Style from './Builder.module.css'
import { DesignContainer } from './components/designContainer/DesignContainer'
import { DesignContent } from './components/designContent/DesignContent'
import { ActionBar } from './components/actionBar/ActionBar'
import { Toolbar } from './components/toolbar/Toolbar'
import { AddNewElement } from './components/addNewElement/AddNewElement'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { ButtonControllerContext } from '@/contexts/ButtonControllerContext'
import { TextControllerContext } from '@/contexts/TextControllerContext'
import { DashboardTitle } from './components/dashboardTitle/DashboardTitle'
import { ButtonController } from './components/buttonController/ButtonController'
import { TextController } from './components/textController/TextController'

export function Builder() {
  const dashboardContent = useContext(DashboardContentContext)
  const { buttonId } = useContext(ButtonControllerContext)
  const { textId } = useContext(TextControllerContext)

  // if (dashboardContent?.dashboardElements) {
  //   return (
  //     <main className={Style['builder-container']}>
  //       <AddNewElement />
  //     </main>
  //   )
  // }

  return (
    <main className={Style['builder-container']}>
      <DesignContainer>
        <DashboardTitle />
        <DesignContent />
      </DesignContainer>
      <ActionBar />
      <Toolbar />
      {buttonId && <ButtonController />}
      {textId && <TextController />}
    </main>
  )
}
