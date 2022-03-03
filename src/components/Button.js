import React from 'react'
import classNames from 'classnames'

import 'components/Button.scss'

export default function Button (props) {
  let buttonClass = classNames('button', {
    'button--confirm': props.confirm,
    'button--danger': props.danger
  })

  const { onClick, disabled } = props

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {props.children}
    </button>
  )
}
