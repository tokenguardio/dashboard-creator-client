/***
 *
 *   TABS
 *
 **********/

import Style from './Tabs.module.css'

export const Tabs = ({ tabs, activeTab, action }) => {

  return (
    <ul className={Style['tabs']}>
      {tabs.map((tab, index) => {
        return (
          <Tab
            key={index}
            name={tab.name}
            isActive={activeTab === tab.name}
            onClick={() => action(tab.name)}
          />
        )
      })}
    </ul>
  )
}

const Tab = ({ name, isActive, onClick }) => (
  <li
    className={`tab ${isActive ? Style['active-tab'] : Style['tab']}`}
    onClick={onClick}
  >
    {name}
  </li>
)
