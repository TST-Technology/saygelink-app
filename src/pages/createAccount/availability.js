import React, { useContext, useState } from 'react'
import TimePicker from '../../components/create-account/time-picker'
import WeekdaySelector from '../../components/create-account/week-day-selector'
import {
  StyleAddIntervalButton,
  StyleDayTimeContainer,
  StyleInput,
  StyleInputButton,
  StyleInputButtonContainer
} from '../../style-component/createAccount/availability'
import {
  StepperSubtitle,
  StepperSubtitleBold,
  StyleCreateAccountBodyContainer,
  StyleNextButton,
  StyleNextButtonContainer,
  StyleMarginTop2
} from '../../style-component/createAccount/create-account'
import { DarkGrayLable } from '../../style-component/general'
import { CreateAccountContext } from './create-account'
import CloseIcon from '../../assets/images/CrossIcon.svg'

const Availability = () => {
  const [requests, setRequests] = useState(1)
  const { formData, setStep, setFormData, step } =
    useContext(CreateAccountContext)
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [dateEx7, setDateEx7] = useState('10:12')

  const INIT_TIME = {
    hour: '',
    minute: '',
    time: ''
  }

  const INIT_INTERVAL = {
    day: 'Sat',
    start_time: JSON.parse(JSON.stringify(INIT_TIME)),
    end_time: JSON.parse(JSON.stringify(INIT_TIME)),
    timezone: 'EDT'
  }

  const [timeData, setTimeData] = useState([INIT_INTERVAL])

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
    setTimeData((prevValue) => {
      const temp = prevValue.slice()
      temp.push(INIT_INTERVAL)
      return [...temp]
    })
  }

  const removeInterval = (index) => {
    setTimeData((prevValue) => {
      const temp = prevValue.slice()
      temp.splice(index, 1)
      return [...temp]
    })
  }

  const onChangeInterval = (key, subKey, value, index) => {
    setTimeData((prevValue) => {
      const temp = prevValue

      if (temp) {
        temp[index][key][subKey] = value

        return [...temp]
      }
    })
  }

  const handleNextButtonClick = (e) => {
    e.preventDefault()
    setStep((prevValue) => prevValue + 1)
  }

  return (
    <>
      <DarkGrayLable>My availability</DarkGrayLable>
      <StyleMarginTop2>
        <StepperSubtitleBold>Maximum chat requests</StepperSubtitleBold>
      </StyleMarginTop2>

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
                      name={`startTime${index}`}
                      hour={row.start_time.hour}
                      minute={row.start_time.minute}
                      time={row.start_time.time}
                      onChangeHour={(val) =>
                        onChangeInterval('start_time', 'hour', val, index)
                      }
                      onChangeMinute={(val) =>
                        onChangeInterval('start_time', 'minute', val, index)
                      }
                      onChangeTime={(val) =>
                        onChangeInterval('start_time', 'time', val, index)
                      }
                    />
                  </div>

                  <div className='endTimeContainer'>
                    <p className='timeLabel'>End time</p>
                    <TimePicker
                      name={`endTime${index}`}
                      hour={row.end_time.hour}
                      minute={row.end_time.minute}
                      time={row.end_time.time}
                      onChangeHour={(val) =>
                        onChangeInterval('end_time', 'hour', val, index)
                      }
                      onChangeMinute={(val) =>
                        onChangeInterval('end_time', 'minute', val, index)
                      }
                      onChangeTime={(val) =>
                        onChangeInterval('end_time', 'time', val, index)
                      }
                    />
                  </div>

                  <StyleAddIntervalButton
                    onClick={(e) => {
                      onAddTimeInterval(e)
                    }}
                  >
                    Add interval
                  </StyleAddIntervalButton>

                  {timeData.length > 1 ? (
                    <a
                      className='removeIcon'
                      onClick={(e) => removeInterval(index)}
                    >
                      <img src={CloseIcon} />
                    </a>
                  ) : null}
                </div>
              </div>
            )
          })}
      </StyleDayTimeContainer>
      <StyleNextButtonContainer>
        <StyleNextButton
          onClick={(e) => {
            handleNextButtonClick(e)
          }}
        >
          Next
        </StyleNextButton>
      </StyleNextButtonContainer>
    </>
  )
}

export default Availability
