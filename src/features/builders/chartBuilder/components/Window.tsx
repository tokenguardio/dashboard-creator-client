import { ReactNode } from 'react'
import Style from './Window.module.css'

export const Window = ({ children }: {children: ReactNode}) => (
  <div className={Style['window-container']}>
    {children}
  </div>
)