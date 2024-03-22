/***
 *
 *   OPTION BADGE
 *
 *   PROPS
 *   children: children to render
 *   selected: for set style of selected element
 *   feezing: for freeze element
 *   action: callback function executed on click
 *   params: object passed to the callback function (optional)
 *
 **********/
import React from 'react'

import Style from './OptionBadge.module.css'

export function OptionBadge(props) {

  return (
    <div
      className={props.selected ? Style['selected-option-badge'] : Style['option-badge']}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        props.action && props.action(props.params)
      }}
    >
      {props.children}
    </div>
  )
}
