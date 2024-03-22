import React, { ReactNode } from 'react'

import Style from './IconButton.module.css'

interface IconButtonProps {
  icon: ReactNode,
  onClick: () => void,
  children?: ReactNode
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: icon,
  onClick,
  children,
}) => {
  return (
    <button
      className={Style['icon-button']}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  )
}
