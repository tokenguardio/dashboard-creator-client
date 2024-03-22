
import { useState, useEffect } from 'react'

import Style from './AnimationValue.module.css'

export const AnimationValue = ({ value, prefix, theme }) => {
  const [displayedValue, setDisplayedValue] = useState(0)

  useEffect(() => {
    let startValue = 0
    const duration = 1000
    const startTime = new Date().getTime()
    const formatter = Intl.NumberFormat('en', { notation: 'compact' })

    const animate = () => {
      const currentTime = new Date().getTime()
      const growth = Math.min(1, (currentTime - startTime) / duration)
      setDisplayedValue(Math.floor(startValue + growth * (value - startValue)).toString().slice(0, 5))
      if (growth < 1) {
        requestAnimationFrame(animate)
      } else if (growth === 1) {
        if (prefix) {
          setDisplayedValue(`${prefix}${formatter.format(value)}`)
        } else {
          setDisplayedValue(formatter.format(value))
        }
      }
    }

    if (typeof value === 'string') {
      setDisplayedValue(value)
    } else if (value === 0) {
      setDisplayedValue('N/A')
    } else {    
      animate()
    }
  }, [value, prefix])

  return (
    <span
      className={Style['animation-value']}
      style={{
        color: theme?.textColor,
        fontFamily: theme?.font
      }}
    >
      {displayedValue}
    </span>
  )
}