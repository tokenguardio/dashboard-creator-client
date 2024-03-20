import React, {
  useState,
  useEffect,
  useRef,
} from 'react'

import { Icon } from '@/components/icon/Icon'
import clsx from 'clsx'
import Style from './Dropdown.module.scss'

export const Dropdown = ({
  options,
  id,
  children,
  title,
  position,
}) => {
  const [_clickedOutside, setClickedOutside] = useState(false)
  const [isOpenDropDown, setOpenDropDown] = useState(false)
  const myRef = useRef(null)

  const dropDownStyle = clsx(
    Style['list'],
    position === 'left' && Style['position-left'],
    position === 'bottom' && Style['position-bottom'],
  )

  const handleOptionClick = (action) => {
    setOpenDropDown(false)
    action(id)
  }

  const handleClickOutside = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target instanceof HTMLElement &&
      !myRef?.current?.contains(e.target)
    ) {
      setClickedOutside(true)
      setOpenDropDown(false)
    }
  }

  const handleClickInside = () => setClickedOutside(false)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  return (
    <div ref={myRef} onClick={handleClickInside}>
      <div
        className={Style['wrapper']}
        onClick={() => setOpenDropDown(!isOpenDropDown)}
      >
        {children}
      </div>

      {isOpenDropDown && (
        <div className={dropDownStyle}>
          {title && <p className={Style['title']}>{title}</p>}
          <ul>
            {options.map(({
              label,
              type,
              action,
              logo,
              icon
            }) => {
              return (
                <li
                  onClick={() => handleOptionClick(action)}
                  key={label}
                  className={
                    type ? `${Style[type]} ${Style.option}` : Style.option
                  }
                >
                  {logo && <img src={logo} alt={`logo ${label}`} />}
                  {icon && <Icon width="12" height="12" name={icon} />}
                  <p>{label}</p>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
