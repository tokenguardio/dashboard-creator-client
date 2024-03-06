import React, { ReactNode } from 'react';
import Style from './Button.module.css'

interface ButtonProps {
  onClick: () => void,
  children?: ReactNode,
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
}) => (
  <button className={Style['button']} onClick={onClick}>
    {children}
  </button>
)
