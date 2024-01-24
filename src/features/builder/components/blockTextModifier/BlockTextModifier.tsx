import { useState, useEffect, useContext } from 'react'

import { Modal } from '@/components/modal/Modal'
import { BlockTextContext } from '@/contexts/BlockTextContext'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'

import { TextEditor } from '../textEditor/TextEditor'

import Style from './BlockTextModifier.module.css'

export const BlockTextModifier = () => {
  const blockTextContext = useContext(BlockTextContext)
  const [contentText, setContentText] = useState('')
  const { blockTextId, setBlockTextId } = blockTextContext
  const {
    dashboardElements,
    setDashboardElements,
    setDashboardLayout,
    dashboardLayout,
  } = useContext(DashboardContentContext)

  useEffect(() => {
    const textData = dashboardElements.filter(element => element.i === blockTextId)

    if (textData.length > 0) {
      setContentText(textData[0].text)
    }

  }, [blockTextId])

  const updateTextBlock = (modifiedText) => {
    setContentText(modifiedText)
    const textData = dashboardElements.filter(element => element.i === blockTextId)

    if (textData.length > 0) {
      const updatedDashboardElements = dashboardElements.map(element => {
        if (element.i === blockTextId) {
          return (
            {
              text: modifiedText,
              type: 'text',
              i: blockTextId
            }
          )
        } else {
          return element
        }
      })
      const updatedDashboardLayout = dashboardLayout.map(item => {
        return item
      })
      setDashboardElements(updatedDashboardElements)
      setDashboardLayout(updatedDashboardLayout)
      setBlockTextId(undefined)
    } else {
      setDashboardElements([
        ...dashboardElements,
        {
          text: modifiedText,
          type: 'text',
          i: blockTextId
        }
      ])
      setDashboardLayout([
        ...dashboardLayout,
        { i: blockTextId, x: 0, y: 0, w: 1, h: 2, minH: 2 },
      ])
      setBlockTextId(undefined)
    }
  }

  return (
    <>
      {blockTextId && (
        <Modal
          title="Text Settings"
          hasCloseButton
          isOpen={() => setBlockTextId(undefined)}
        >
          <div className={Style['container']}>
            <TextEditor data={contentText} saveDataFn={updateTextBlock} />
          </div>
        </Modal>
      )}
    </>
  )
}