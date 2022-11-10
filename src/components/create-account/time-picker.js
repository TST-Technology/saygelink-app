import React, { useState } from 'react'
import { useEffect } from 'react'
import {
  StyledHourMinuteInput,
  StyleTimeDropdown,
  StyleTimePickerContainer
} from '../../style-component/createAccount/time-picker'

const TimePicker = ({
  name,
  hour,
  minute,
  time,
  onChangeHour,
  onChangeMinute,
  onChangeTime,
  backgroundColor
}) => {
  const handleHourChange = (val) => {
    onChangeHour(val)
  }

  return (
    <StyleTimePickerContainer>
      <div className='minHourContainer'>
        <StyledHourMinuteInput
          value={hour}
          name={`hour${name}`}
          type='tel'
          maxLength={2}
          onChange={(e) => handleHourChange(e.target.value)}
          backgroundColor={backgroundColor}
        />

        <span className='divider'>:</span>

        <StyledHourMinuteInput
          value={minute}
          type='tel'
          name={`minute${name}`}
          maxLength={2}
          onChange={(e) => onChangeMinute(e.target.value)}
          backgroundColor={backgroundColor}
        />
      </div>

      <StyleTimeDropdown
        name={`time${name}`}
        value={time}
        onChange={(e) => onChangeTime(e.target.value)}
        backgroundColor={backgroundColor}
      >
        <option value='AM'>AM</option>
        <option value='PM'>PM</option>
      </StyleTimeDropdown>
    </StyleTimePickerContainer>
  )
}

export default TimePicker
