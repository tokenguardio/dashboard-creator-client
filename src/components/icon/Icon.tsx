/***
 *
 *   ICON
 *
 **********/

import { type SVGProps } from 'react'
import spriteHref from '@/assets/icons/sprite.svg'
import Style from './Icon.module.css'

export function Icon({
  name,
  active,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: string,
  active: boolean
}) {
  return (
    <svg className={active ? Style['icon-active'] : Style['icon']} {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}

