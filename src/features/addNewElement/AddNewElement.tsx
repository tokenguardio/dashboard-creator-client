import Style from './AddNewElement.module.css'
import visualization from './assets/icons/visualization.svg'
import text from './assets/icons/text.svg'
import button from './assets/icons/button.svg'


const elements = [
  { type: 'visualization', name: 'Visualization', path: '/add-visualization', icon: visualization },
  { type: 'text', name: 'Text', path: '/add-text', icon: text },
  { type: 'button', name: 'Button', path: '/add-button', icon: button },
]

export const AddNewElement = () => {

  return (
    <div className={Style['add-new-element']}>
      <p className={Style['text']}>Add an element to get started</p>
      <ul className={Style['elements-list']}>
        {elements.map(element => (
          <li className={Style['element-list']} key={element.type}>
            <a className={Style['link']} href={element.path}>
              <img src={element.icon} alt="" />
              <p className={Style['element-name']}>{element.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}