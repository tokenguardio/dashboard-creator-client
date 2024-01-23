import { NavLink } from 'react-router-dom'
import Style from './ButtonSlide.module.css'
import { Icon } from '@/components/icon/Icon'

export const ButtonSlide = () => (
  <NavLink to="/create-dashboard" className={Style['button-slide']}>
    <Icon name="plus" active width="1.6rem" height="1.6rem" color="primary" />
    <p className={Style['text']}>Create new dashboard</p>
  </NavLink>
)
