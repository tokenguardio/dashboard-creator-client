/***
 *
 *   CARD
 *
 **********/

import React, { ReactNode } from 'react'

import Style from './Card.module.css'

interface CardProps {
  title?: string,
  children: ReactNode,
}

export const Card: React.FC<CardProps> = (props) => (
  <div className={Style['card']}>
    {props.title && (
      <header className={Style.header}>
        <h1 className={Style.title}>{props.title}</h1>
      </header>
    )}
    {props.children}
  </div>
)
