import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import Style from './Layout.module.scss'

export const Layout = () => {
  return (
    <div className={Style['layout-container']}>
      <Sidebar />
      <Outlet />
    </div>
  )
}