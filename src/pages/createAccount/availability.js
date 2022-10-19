import React, { useContext, useState } from 'react'
import TimePicker from '../../components/create-account/time-picker'
import WeekdaySelector from '../../components/create-account/week-day-selector'
import {
  StyleAddIntervalButton,
  StyleDayTimeContainer,
  StyleInput,
  StyleInputButton,
  StyleInputButtonContainer,
  StyleMarginTop
} from '../../style-component/createAccount/availability'
import {
  StepperSubtitle,
  StepperSubtitleBold,
  StyleCreateAccountBodyContainer,
  StyleNextButton,
  StyleNextButtonContainer
} from '../../style-component/createAccount/create-account'
import { DarkGrayLable } from '../../style-component/general'
import { CreateAccountContext } from './create-account'

const Availability = () => {
  const [requests, setRequests] = useState(1)
  const { formData, setStep, setFormData, step } =
    useContext(CreateAccountContext)
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const INIT_TIME = {
    day: 'Sat',
    start_time: '',
    end_time: '',
    timezone: 'EDT'
  }

  const [timeData, setTimeData] = useState([INIT_TIME])

  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const onChangeTime = (key, value, index) => {
    setTimeData((prevValue) => {
      const temp = prevValue

      if (temp) {
        temp[index][key] = value

        return [...temp]
      }
    })
  }

  const onAddTimeInterval = (e) => {
    e.preventDefault()
    console.log('called')
    setTimeData((prevValue) => {
      console.log(prevValue)
      const temp = prevValue.slice()
      temp.push(INIT_TIME)
      console.log(temp)
      return [...temp]
    })
  }

  return (
    <>
      <DarkGrayLable>My availability</DarkGrayLable>
      <StyleMarginTop>
        <StepperSubtitleBold>Maximum chat requests</StepperSubtitleBold>
      </StyleMarginTop>

      <StepperSubtitle>
        Select a limit for the number of chat requests you would like to receive
        per month. A higher number avoids missing out on potential connections!
      </StepperSubtitle>

      <StyleInputButtonContainer>
        <StyleInputButton>
          <a
            className='decrement button'
            onClick={() => setRequests((prevValue) => parseInt(prevValue) - 1)}
          >
            -
          </a>
          <StyleInput
            type={'number'}
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
          ></StyleInput>
          <a
            className='increment button'
            onClick={() => setRequests((prevValue) => parseInt(prevValue) + 1)}
          >
            +
          </a>
        </StyleInputButton>

        <div className='requestsPerMonthText'>requests per month</div>
      </StyleInputButtonContainer>

      <StyleDayTimeContainer>
        <p className='dayTimeText'>Select the day & time your available</p>

        {timeData &&
          timeData.map((row, index) => {
            return (
              <div key={index} className='dayTimeContainer'>
                <WeekdaySelector
                  items={weeks}
                  selectedItemLabel={row.day}
                  onClick={(val) => {
                    onChangeTime('day', val, index)
                  }}
                />

                <div className='timePickerContainer'>
                  <div className='startTimeContainer'>
                    <p className='timeLabel'>Start time</p>
                    <TimePicker
                      onChange={(val) => onChangeTime('start_time', val, index)}
                    />
                  </div>

                  <div className='endTimeContainer'>
                    <p className='timeLabel'>End time</p>
                    <TimePicker
                      onChange={(val) => onChangeTime('end_time', val, index)}
                    />
                  </div>

                  <StyleAddIntervalButton
                    onClick={(e) => {
                      onAddTimeInterval(e)
                    }}
                  >
                    Add interval
                  </StyleAddIntervalButton>
                </div>
              </div>
            )
          })}
      </StyleDayTimeContainer>
      <StyleNextButtonContainer>
        <StyleNextButton>Next</StyleNextButton>
      </StyleNextButtonContainer>
    </>
  )
}

export default Availability
