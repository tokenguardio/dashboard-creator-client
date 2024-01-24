import { NavLink } from 'react-router-dom'

import { Icon } from '@/components/icon/Icon'

import Style from './SlideButton.module.css'

export const SlideButton = () => (
  <NavLink to="/create-dashboard" className={Style['slide-button']}>
    <Icon name="plus" active width="1.6rem" height="1.6rem" color="primary" />
    <p className={Style['text']}>Create new dashboard</p>
  </NavLink>
)