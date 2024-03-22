import React, { ReactNode } from 'react'
import clsx from 'clsx'

import Style from './Button.module.css'

interface ButtonProps {
  onClick: () => void,
  children?: ReactNode,
  size: 'small' | 'medium' | 'large',
  variant: 'outline' | 'solid',
  color: string,
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  size,
  variant,
  color
}) => {
  const buttonStyle = clsx(
    Style['button'],
    variant ? Style[variant] : Style['solid'],
    size ? Style[size] : Style['medium'],
    color ? Style[size] : Style['primary'],
  )

  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  )
}