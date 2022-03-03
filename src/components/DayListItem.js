import React from 'react'
import classNames from 'classnames'

import 'components/DayListItem.scss'

export default function DayListItem (props) {
  let dayListItemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  })

  const formatSpots = function (spots) {
    if (spots > 1) {
      return spots + ' spots remaining'
    }

    if (spots === 1) {
      return spots + ' spot remaining'
    }

    if (spots === 0) {
      return 'no spots remaining'
    }
  }

  return (
    <li
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
		>
      <h2 className='text--regular'>
        {props.name}
      </h2>
      <h3 className='text--light'>
        {formatSpots(props.spots)}
      </h3>
    </li>
  )
}
