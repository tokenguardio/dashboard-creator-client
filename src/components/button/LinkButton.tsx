import React, { ReactNode } from 'react'

import Style from './LinkButton.module.css'

interface ButtonProps {
  onClick: () => void,
  children?: ReactNode,
}

export const LinkButton: React.FC<ButtonProps> = ({
  onClick,
  children,
}) => (
  <button className={Style['link-button']} onClick={onClick}>
    {children}
  </button>
)
