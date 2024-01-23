import { useState, useEffect, useContext } from 'react'

import { Modal } from '@/components/modal/Modal'
import { TextInput } from '@/components/input/TextInput'
import { Button } from '@/components/button/Button'
import { ButtonControllerContext } from '@/contexts/ButtonControllerContext'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'

import Style from './ButtonController.module.css'

export const ButtonController = () => {
  const [buttonText, setButtonText] = useState('')
  const [buttonLink, setButtonLink] = useState('')
  const buttonController = useContext(ButtonControllerContext)
  const { buttonId, setButtonId } = buttonController
  const {
    dashboardElements,
    setDashboardElements,
    setDashboardLayout,
    dashboardLayout,
  } = useContext(DashboardContentContext)

  useEffect(() => {
    const buttonData = dashboardElements.filter(element => element.i === buttonId)

    if (buttonData.length > 0) {
      setButtonText(buttonData[0].text)
      setButtonLink(buttonData[0].link)
    }

  }, [buttonId])


  const saveButton = () => {
    const buttonData = dashboardElements.filter(element => element.i === buttonId)

    if (buttonData.length > 0) {
      const updatedDashboardElements = dashboardElements.map(element => {
        if (element.i === buttonId) {
          return (
            {
              link: buttonLink,
              text: buttonText,
              type: 'button',
              i: buttonId
            }
          )
        } else {
          return element
        }
      })
      setDashboardElements(updatedDashboardElements)
      const updatedDashboardLayout = dashboardLayout.map(item => {
        return item
      })
      setDashboardLayout(updatedDashboardLayout)
      setButtonId(undefined)
    } else {
      setDashboardElements([
        ...dashboardElements,
        {
          link: buttonLink,
          text: buttonText,
          type: 'button',
          i: buttonId
        }
      ])
      setDashboardLayout([
        ...dashboardLayout,
        { i: buttonId, x: 0, y: 0, w: 1, h: 2, minH: 2 },
      ])
      setButtonId(undefined)
    }
  }

  return (
    <>
      {buttonId && (
        <Modal
          title="Button Settings"
          hasCloseButton
          isOpen={() => setButtonId(undefined)}
        >
          <div className={Style['container']}>
            <TextInput
              label="Button Text"
              defaultValue={buttonText}
              value={buttonText}
              placeholder={buttonText || 'Example Button'}
              change={(e) => setButtonText(e.target.value)}
            />
            <TextInput
              label="Link"
              value={buttonLink}
              defaultValue={buttonLink}
              placeholder={buttonLink || "Enter button link"}
              change={(e) => setButtonLink(e.target.value)}
            />
            <Button onClick={() => saveButton()}>Save</Button>
          </div>
        </Modal>
      )}
    </>
  )
}