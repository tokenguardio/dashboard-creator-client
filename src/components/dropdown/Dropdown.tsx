import { useState, useEffect, useRef } from 'react'
// import { useOutsideClick } from '@/hooks/useOutsideClick'
import Style from './Dropdown.module.scss'

export const Dropdown = ({ options, id, children }) => {
  const [_clickedOutside, setClickedOutside] = useState(false)
  const [isOpenDropDown, setOpenDropDown] = useState(false)
  const myRef = useRef(null)
  // const ref = useOutsideClick()

  const handleClickOutside = (e) => {
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
    <div className="relative" ref={myRef} onClick={handleClickInside}>
      <div
        className={Style.wrapper}
        onClick={() => setOpenDropDown(!isOpenDropDown)}
      >
        {children}
      </div>

      {isOpenDropDown && (
        <ul className={Style.list}>
          {options.map(({ name, type, action, logo }) => {
            return (
              <li
                onClick={() => action(id)}
                key={name}
                className={
                  type ? `${Style[type]} ${Style.option}` : Style.option
                }
              >
                {logo && <img src={logo} alt={`logo ${name}`} />}
                {name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
