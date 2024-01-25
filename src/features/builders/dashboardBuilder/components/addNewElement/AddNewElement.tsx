import { useContext } from 'react'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { BlockButtonContext } from '@/contexts/BlockButtonContext'
import { BlockTextContext } from '@/contexts/BlockTextContext'
import { BlockChartContext } from '@/contexts/BlockChartContext'

import Style from './AddNewElement.module.css'
import visualization from './assets/icons/visualization.svg'
import text from './assets/icons/text.svg'
import button from './assets/icons/button.svg'
import { generateUniqueString } from '../../utils/helpers'


const elements = [
  { type: 'visualization', name: 'Visualization', icon: visualization },
  { type: 'text', name: 'Text', icon: text },
  { type: 'button', name: 'Button', icon: button },
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
  const blockChartContext = useContext(BlockChartContext)

  if (!blockButtonContext) {
    throw new Error('Button controller context must be used in Provider')
  }

  if (!blockTextContext) {
    throw new Error('Block text context must be used in Provider')
  }

  if (!blockChartContext) {
    throw new Error('Block chart context must be used in Provider')
  }

  const { blockButtonId, setBlockButtonId } = blockButtonContext
  const { blockTextId, setBlockTextId } = blockTextContext
  const { blockChartId, setBlockChartId } = blockChartContext

  const addElement = (elementType: string) => {
  
    if (elementType === 'button') {
      const elementId = generateUniqueString(dashboardElements)
      setBlockButtonId(elementId)
      closeToolbar(false)
    } else if (elementType === 'text') {
      const elementId = generateUniqueString(dashboardElements)
      setBlockTextId(elementId)
      closeToolbar(false)
    } else if (elementType === 'visualization') {
      const elementId = generateUniqueString(dashboardElements)
      setBlockChartId(elementId)
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