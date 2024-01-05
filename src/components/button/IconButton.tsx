import React, { ReactNode } from 'react';
import Style from './IconButton.module.scss'

interface IconButtonProps {
  // icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  icon: React.ImgHTMLAttributes<HTMLImageElement> | string | undefined,
  onClick: () => void,
  children?: ReactNode
}

export const IconButton: React.FC<IconButtonProps> = ({ icon: icon, onClick, children }) => {
  return (
    <button className={Style['icon-button']} onClick={onClick}>
      {/* <Icon /> */}
      <img src={icon} alt="" />
      {children}
    </button>
  )
}
