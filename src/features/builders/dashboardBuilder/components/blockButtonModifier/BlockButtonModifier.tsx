import { useState, useEffect, useContext } from 'react'

import { Modal } from '@/components/modal/Modal'
import { TextInput } from '@/components/input/TextInput'
import { Button } from '@/components/button/Button'
import { BlockButtonContext } from '@/contexts/BlockButtonContext'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'

import Style from './BlockButtonModifier.module.css'

export const BlockButtonModifier = () => {
  const [buttonText, setButtonText] = useState('')
  const [buttonLink, setButtonLink] = useState('')
  const buttonContext = useContext(BlockButtonContext)
  const { blockButtonId, setBlockButtonId } = buttonContext
  const {
    dashboardElements,
    setDashboardElements,
    setDashboardLayout,
    dashboardLayout,
  } = useContext(DashboardContentContext)

  useEffect(() => {
    const buttonData = dashboardElements.filter(element => element.i === blockButtonId)

    if (buttonData.length > 0) {
      setButtonText(buttonData[0].text)
      setButtonLink(buttonData[0].link)
    }

  }, [blockButtonId])


  const saveButton = () => {
    const buttonData = dashboardElements.filter(element => element.i === blockButtonId)

    if (buttonData.length > 0) {
      const updatedDashboardElements = dashboardElements.map(element => {
        if (element.i === blockButtonId) {
          return (
            {
              link: buttonLink,
              text: buttonText,
              type: 'button',
              i: blockButtonId
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
      setBlockButtonId(undefined)
    } else {
      setDashboardElements([
        ...dashboardElements,
        {
          link: buttonLink,
          text: buttonText,
          type: 'button',
          i: blockButtonId
        }
      ])
      setDashboardLayout([
        ...dashboardLayout,
        { i: blockButtonId, x: 0, y: 0, w: 1, h: 2, minH: 2 },
      ])
      setBlockButtonId(undefined)
    }
  }

  return (
    <>
      {blockButtonId && (
        <Modal
          title="Button Settings"
          hasCloseButton
          isOpen={() => setBlockButtonId(undefined)}
        >
          <div className={Style['container']}>
            <TextInput
              label="Button Text"
              name="button-text"
              defaultValue={buttonText}
              value={buttonText}
              placeholder={buttonText || 'Example Button'}
              change={(e) => setButtonText(e.target.value)}
            />
            <TextInput
              label="Link"
              name="link"
              defaultValue={buttonLink}
              value={buttonLink}
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