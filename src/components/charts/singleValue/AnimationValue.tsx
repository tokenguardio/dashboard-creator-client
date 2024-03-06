
import { useState, useEffect } from 'react'
import Style from './AnimationValue.module.css'

export const AnimationValue = ({ value, prefix }) => {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    let startValue = 0
    const duration = 1000
    const startTime = new Date().getTime()
    const formatter = Intl.NumberFormat('en', { notation: 'compact' })

    const animate = () => {
      const currentTime = new Date().getTime()
      const growth = Math.min(1, (currentTime - startTime) / duration)
      setAnimatedValue(Math.floor(startValue + growth * (value - startValue)).toString().slice(0, 5))
      if (growth < 1) {
        requestAnimationFrame(animate)
      } else if (growth === 1) {
        if (prefix) {
          setAnimatedValue(`${prefix}${formatter.format(value)}`)
        } else {
          setAnimatedValue(formatter.format(value))
        }
      }
    }

    if (!value) {
      setAnimatedValue('N/A')
    } else if (value === 0 || value.length === 0) {
      setAnimatedValue('N/A')
    } else {    
      animate()
    }
  }, [value, prefix])

  return <span className={Style['animation-value']}>{animatedValue}</span>
}