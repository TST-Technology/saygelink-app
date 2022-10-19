import React from 'react'
import {
  StyleCard,
  StyleWeekdayContainer
} from '../../style-component/createAccount/weekday-selector'

const WeekdaySelector = ({ items, selectedItemLabel, onClick }) => {
  return (
    <StyleWeekdayContainer>
      {items &&
        items.map((item) => {
          return (
            <StyleCard
              key={item}
              selected={item === selectedItemLabel}
              onClick={() => {
                onClick(item)
              }}
            >
              <p className='weekdayText'>
                {item ? item.charAt(0).toUpperCase() : ''}
              </p>
            </StyleCard>
          )
        })}
    </StyleWeekdayContainer>
  )
}

export default WeekdaySelector
