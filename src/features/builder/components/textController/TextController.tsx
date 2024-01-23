import { useState, useEffect, useContext } from 'react'

import { Modal } from '@/components/modal/Modal'
// import { TextInput } from '@/components/input/TextInput'
// import { Button } from '@/components/button/Button'
import { TextControllerContext } from '@/contexts/TextControllerContext'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { TextEditor } from '../textEditor/TextEditor'

import Style from './TextController.module.css'

export const TextController = () => {
  const textController = useContext(TextControllerContext)
  const [textText, setTextText] = useState('')
  const { textId, setTextId } = textController
  const {
    dashboardElements,
    setDashboardElements,
    setDashboardLayout,
    dashboardLayout,
  } = useContext(DashboardContentContext)

  useEffect(() => {
    const textData = dashboardElements.filter(element => element.i === textId)

    if (textData.length > 0) {
      setTextText(textData[0].text)
    }

  }, [textId])

  const testFn = (text) => {
    setTextText(text)
    const textData = dashboardElements.filter(element => element.i === textId)

    if (textData.length > 0) {
      const updatedDashboardElements = dashboardElements.map(element => {
        if (element.i === textId) {
          return (
            {
              text: text,
              type: 'text',
              i: textId
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
      setTextId(undefined)
    } else {
      setDashboardElements([
        ...dashboardElements,
        {
          text: text,
          type: 'text',
          i: textId
        }
      ])
      setDashboardLayout([
        ...dashboardLayout,
        { i: textId, x: 0, y: 0, w: 1, h: 2, minH: 2 },
      ])
      setTextId(undefined)
    }
  };


  // const saveButton = () => {
  //   const updatedDashboardElements = dashboardElements.map(element => {
  //     if (element.i === textId) {
  //       return (
  //         {
  //           text: textText,
  //           type: 'text',
  //           i: textId
  //         }
  //       )
  //     } else {
  //       return element
  //     }
  //   })
  //   const updatedDashboardLayout = dashboardLayout.map(item => {
  //     return item
  //   })
  //   setDashboardElements(updatedDashboardElements)
  //   setDashboardLayout(updatedDashboardLayout)
  //   setTextId(undefined)
  // }

  return (
    <>
      {textId && (
        <Modal
          title="Text Settings"
          hasCloseButton
          isOpen={() => setTextId(undefined)}
        >
          <div className={Style['container']}>
            <TextEditor data={textText} modifyData={testFn} />
          </div>
        </Modal>
      )}
    </>
  )
}