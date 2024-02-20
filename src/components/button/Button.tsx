import React, { ReactNode } from 'react';
import Style from './Button.module.css'

interface ButtonProps {
  onClick: () => void,
  children?: ReactNode,
  // TODO
  // color: string,
  // variant: string,
  // size: string,
  // leftIcon,
  // rightIcon,
}

// export const Button: React.FC<ButtonProps> = ({ leftIcon: icon, rightIcon: icon, onClick, children }) => {
export const Button: React.FC<ButtonProps> = ({
  // TODO
  // color,
  // variant,
  // size,
  // leftIcon,
  // rightIcon,
  onClick,
  children,
}) => {
  return (
    <button className={Style['button']} onClick={onClick}>
      {/* to do */}
      {/* {leftIcon && <img src={leftIcon} alt="" />} */}
      {children}
      {/* to do */}
      {/* {rightIcon && <img src={rightIcon} alt="" />} */}
    </button>
  )
}
