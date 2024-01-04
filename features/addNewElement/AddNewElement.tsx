import Style from './AddNewElement.module.scss'
import visualization from '@/assets/icons/visualization-icon.svg'
import text from '@/assets/icons/visualization-icon.svg'
import markdown from '@/assets/icons/visualization-icon.svg'
import button from '@/assets/icons/visualization-icon.svg'

const elements = [
  { type: 'visualization', name: 'Visualization', path: '/add-visualization', icon: visualization },
  { type: 'text', name: 'Text', path: '/add-visualization', icon: text },
  { type: 'markdown', name: 'Markdown', path: '/add-visualization', icon: markdown },
  { type: 'button', name: 'Button', path: '/add-visualization', icon: button },
]

export const AddNewElement = () => {

  return (
    <div className={Style['add-new-element']}>
      <p className={Style['text']}>Add an element to get started</p>
      <ul className={Style['elements-list']}>
        {elements.map(element => (
          <li className={Style['element-list']} key={element.type}>
            <img src={element.icon} alt="" />
            <p className={Style['element-name']}>{element.name}</p>
          </li>
        ))}
      </ul>
      
    </div>
  )
}