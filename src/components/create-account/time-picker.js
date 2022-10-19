import React, { useState } from 'react'
import { useEffect } from 'react'
import {
  StyledHourMinuteInput,
  StyleTimeDropdown,
  StyleTimePickerContainer
} from '../../style-component/createAccount/time-picker'

const TimePicker = ({ onChange }) => {
  const [hour, setHour] = useState(null)
  const [minute, setMinute] = useState(null)
  const [time, setTime] = useState('AM')

  useEffect(() => {
    if (hour && minute && time) {
      onChange(`${hour}:${minute}${time}`)
    }
  }, [hour, minute, time])

  const onTimeChange = (value) => {
    setTime(value)
    console.log(value)
  }

  return (
    <StyleTimePickerContainer>
      <div className='minHourContainer'>
        <StyledHourMinuteInput
          value={hour}
          name='hour'
          type='tel'
          maxLength={2}
          min={1}
          max={12}
          onChange={(e) => setHour(e.target.value)}
        />

        <span className='divider'>:</span>

        <StyledHourMinuteInput
          value={minute}
          type='tel'
          name='minute'
          maxLength={2}
          min={0}
          max={60}
          onChange={(e) => setMinute(e.target.value)}
        />
      </div>

      <StyleTimeDropdown onChange={(e) => onTimeChange(e.target.value)}>
        <option value='AM'>AM</option>
        <option value='PM'>PM</option>
      </StyleTimeDropdown>
    </StyleTimePickerContainer>
  )
}

export default TimePicker
