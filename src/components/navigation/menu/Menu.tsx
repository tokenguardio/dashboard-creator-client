/***
 *
 *   MENU
 *   main app navigation
 *
 **********/

import { NavLink, matchPath, useLocation } from 'react-router-dom'
import Style from './Menu.module.scss'
import { Icon } from '@/components/icon/Icon'

type NavItem = {
  link: string;
  icon: string;
  name: string;
  related: Array<string>;
  label: string;
  disabled: boolean;
};

const navItems: Array<NavItem> = [
  {
    link: '/create-dashboard',
    icon: 'block',
    name: 'Dashboard Builder',
    related: ['/create-dashboard','/edit-dashboard/:id'],
    label: 'Dashboard Builder',
    disabled: false,
  },
  {
    link: '/',
    icon: 'chart',
    name: 'Saved Dashboards',
    related: ['/saved-dashboards', '/'],
    label: 'Saved Dashboards',
    disabled: false,
  },
]

const verifyLinkClasses = (isDisabled: boolean, relatedArr: Array<string>, pathname: string) => {
  if (isDisabled) {
    return 'menu-item-disabled'
  }

  if (relatedArr?.length > 0 && relatedArr?.some((path) => matchPath(path, pathname))) {
    return 'menu-item-active'
  }

  return 'menu-item'
}

export const Menu = () => {
  const { pathname } = useLocation()

  return (
    <nav className={Style['menu']}>
      {navItems?.map(item => {
          return (
            <NavLink
              to={item.link}
              className={Style[verifyLinkClasses(item.disabled, item.related, pathname)]}
              key={item.label}
            >
              {({ isActive }) => (
                <>
                  {item.icon && <Icon name={item.icon} width="16" height="16" active={isActive} />}
                  {item.label && (
                    <span
                      className={isActive ? Style['label-active'] : Style['label']} 
                    >
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
    </nav>
  )
}
