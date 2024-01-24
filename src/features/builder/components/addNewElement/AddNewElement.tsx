import { useContext } from 'react'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { ButtonControllerContext } from '@/contexts/ButtonControllerContext'
import { TextControllerContext } from '@/contexts/TextControllerContext'
import Style from './AddNewElement.module.css'
import visualization from './assets/icons/visualization.svg'
import text from './assets/icons/text.svg'
import button from './assets/icons/button.svg'
import { generateUniqueString } from '../../utils/helpers'


const elements = [
  { type: 'visualization', name: 'Visualization', path: '/add-visualization', icon: visualization },
  { type: 'text', name: 'Text', path: '/add-text', icon: text },
  { type: 'button', name: 'Button', path: '/add-button', icon: button },
]


export const AddNewElement = ({ closeToolbar }) => {
  const {
    dashboardElements,
    setDashboardElements,
    setDashboardLayout,
    dashboardLayout,
  } = useContext(DashboardContentContext)

  const buttonControllerContext = useContext(ButtonControllerContext)
  const textControllerContext = useContext(TextControllerContext)

  if (!buttonControllerContext) {
    throw new Error('buttonControllerContext must be used in Provider')
  }

  if (!textControllerContext) {
    throw new Error('textControllerContext must be used in Provider')
  }

  const { buttonId, setButtonId } = buttonControllerContext
  const { textId, setTextId } = textControllerContext

  const addElement = (elementType) => {
  
    if (elementType === 'button') {
      const elementId = generateUniqueString(dashboardElements)
      setButtonId(elementId)
      closeToolbar(false)
    } else if (elementType === 'text') {
      const elementId = generateUniqueString(dashboardElements)
      setTextId(elementId)
      closeToolbar(false)
    }
  }


  return (
    <>
      <div className={Style['add-new-element']}>
        <p className={Style['text']}>Add an element to get started</p>
        <ul className={Style['elements-list']}>
          {elements.map(element => (
            <li className={Style['element-list']} key={element.type} onClick={() => addElement(element.type)}>
                <img src={element.icon} alt="" />
                <p className={Style['element-name']}>{element.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}