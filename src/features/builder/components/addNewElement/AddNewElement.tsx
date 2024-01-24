import { useContext } from 'react'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { BlockButtonContext } from '@/contexts/BlockButtonContext'
import { BlockTextContext } from '@/contexts/BlockTextContext'

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

interface AddNewElementProps {
  closeToolbar?: () => void
}


export const AddNewElement: React.FC<AddNewElementProps> = ({ closeToolbar }) => {
  const {
    dashboardElements,
    setDashboardElements,
    setDashboardLayout,
    dashboardLayout,
  } = useContext(DashboardContentContext)

  const blockButtonContext = useContext(BlockButtonContext)
  const blockTextContext = useContext(BlockTextContext)

  if (!blockButtonContext) {
    throw new Error('Button controller context must be used in Provider')
  }

  if (!blockTextContext) {
    throw new Error('Block text context must be used in Provider')
  }

  const { blockButtonId, setBlockButtonId } = blockButtonContext
  const { blockTextId, setBlockTextId } = blockTextContext

  const addElement = (elementType) => {
  
    if (elementType === 'button') {
      const elementId = generateUniqueString(dashboardElements)
      setBlockButtonId(elementId)
      closeToolbar(false)
    } else if (elementType === 'text') {
      const elementId = generateUniqueString(dashboardElements)
      setBlockTextId(elementId)
      closeToolbar(false)
    }
  }


  return (
    <>
      <div className={Style['add-new-element']}>
        {/* <p className={Style['text']}>Add an element to get started</p> */}
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