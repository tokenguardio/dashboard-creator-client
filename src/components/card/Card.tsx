/***
 *
 *   CARD
 *
 **********/

import Style from './Card.module.css'

export const Card = (props) => {

  return (
    <section className={Style['card']}>
      {props.title && (
        <header className={Style.header}>
          <h1 className={Style.title}>{props.title}</h1>
        </header>
      )}
      {props.children}
      {/* {props.loading ? <Loader /> : props.children} */}
    </section>
  )
}
