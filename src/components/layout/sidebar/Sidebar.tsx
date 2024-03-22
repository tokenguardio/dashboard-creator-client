/***
 *
 *   SIDEBAR
 *
 **********/
import React from 'react'

import { Menu } from '@/components/navigation/menu/Menu'

import Style from './Sidebar.module.scss'

export function Sidebar() {

  return (
    <aside className={Style['sidebar-container']}>
      <Menu />
    </aside>
  )
}
