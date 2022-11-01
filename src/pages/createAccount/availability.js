import React, { useContext, useState } from 'react'
import TimePicker from '../../components/create-account/time-picker'
import WeekdaySelector from '../../components/create-account/week-day-selector'
import {
  StyleAddIntervalButton,
  StyleDayTimeContainer,
  StyleInput,
  StyleInputButton,
  StyleInputButtonContainer,
  StyleTimezoneDropdown
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
import { notify } from '../../utils/funcs'
import { CreateAccountContext } from './create-account'
import DeleteIcon from '../../assets/images/delete.svg'
import useHttp from '../../hooks/use-http'
import CONSTANT from '../../utils/constants'

const Availability = () => {
  const INIT_TIME = {
    hour: '',
    minute: '',
    time: 'AM'
  }

  const INIT_INTERVAL = {
    day: 'Sat',
    start_time: JSON.parse(JSON.stringify(INIT_TIME)),
    end_time: JSON.parse(JSON.stringify(INIT_TIME)),
    timezone: 'EDT'
  }

  const [requests, setRequests] = useState(1)
  const { formData, setStep, setFormData, step } =
    useContext(CreateAccountContext)
  const [interval, setInterval] = useState(INIT_INTERVAL)
  const [allIntervals, setAllIntervals] = useState(null)

  const availabilityApi = useHttp()

  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const onChangeTime = (value) => {
    setInterval((prevValue) => {
      return { ...prevValue, day: value }
    })
  }

  const onChangeInterval = (key, subKey, value) => {
    setInterval((prevValue) => {
      const temp = prevValue

      if (temp) {
        temp[key][subKey] = value

        return { ...JSON.parse(JSON.stringify(temp)) }
      }
    })
  }

  const onAddTimeInterval = (e) => {
    e.preventDefault()
    if (
      interval &&
      interval.day &&
      interval.timezone &&
      interval.start_time &&
      interval?.start_time?.hour &&
      interval?.start_time?.minute &&
      interval?.start_time?.time &&
      interval.end_time &&
      interval?.end_time?.hour &&
      interval?.end_time?.minute &&
      interval?.end_time?.time
    ) {
      const newInterval = JSON.parse(JSON.stringify(interval))
      console.log(newInterval)

      setAllIntervals((prevValue) => {
        if (prevValue) {
          const temp = prevValue.slice()

          console.log(newInterval)

          newInterval.start_time = { ...newInterval.start_time }
          newInterval.end_time = { ...newInterval.end_time }

          temp.push(newInterval)

          return temp
        } else {
          return [JSON.parse(JSON.stringify(newInterval))]
        }
      })
      setInterval((prevValue) => {
        prevValue.start_time = JSON.parse(JSON.stringify(INIT_TIME))
        prevValue.end_time = JSON.parse(JSON.stringify(INIT_TIME))

        return { ...prevValue }
      })
    } else {
      notify.error('Please select all fields')
    }
  }

  const handleNextButtonClick = (e) => {
    e.preventDefault()

    const intervalPayload = prepareIntervalForApiCall()

    const payload = {
      availability: intervalPayload,
      max_chat_requests: requests
    }

    availabilityApi.sendRequest(
      CONSTANT.API.updateUser,
      handleUpdateResponse,
      payload,
      'Availability added successfully!'
    )
  }

  const handleUpdateResponse = (resp) => {
    if (resp) {
      setStep((prevValue) => prevValue + 1)
    }
  }

  const prepareIntervalForApiCall = () => {
    if (allIntervals && Array.isArray(allIntervals)) {
      const temp = allIntervals.map((interval) => {
        const newInterval = JSON.parse(JSON.stringify(interval))
        newInterval.start_time = `${newInterval.start_time.hour}:${newInterval.start_time.minute}${newInterval.start_time.time}`
        newInterval.end_time = `${newInterval.end_time.hour}:${newInterval.end_time.minute}${newInterval.end_time.time}`
        return newInterval
      })

      return temp
    }
  }

  const onRemoveInterval = (index) => {
    setAllIntervals((prevValue) => {
      const temp = prevValue.slice()

      temp.splice(index, 1)
      return [...temp]
    })
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

        <div className='requestsPerMonthText'>Requests per month</div>
      </StyleInputButtonContainer>

      <StyleDayTimeContainer>
        <p className='dayTimeText'>Select the day & time your available</p>

        <div className='dayTimeContainer'>
          <WeekdaySelector
            items={weeks}
            selectedItemLabel={interval.day}
            onClick={(val) => {
              onChangeTime(val)
            }}
          />

          <div className='timePickerContainer'>
            <div className='startTimeContainer'>
              <p className='timeLabel'>Start time</p>
              <TimePicker
                name='startTime'
                minute={interval.start_time.minute}
                hour={interval.start_time.hour}
                time={interval.start_time.time}
                onChangeHour={(val) =>
                  onChangeInterval('start_time', 'hour', val)
                }
                onChangeMinute={(val) =>
                  onChangeInterval('start_time', 'minute', val)
                }
                onChangeTime={(val) =>
                  onChangeInterval('start_time', 'time', val)
                }
              />
            </div>

            <div className='endTimeContainer'>
              <p className='timeLabel'>End time</p>
              <TimePicker
                name='endTime'
                minute={interval.end_time.minute}
                hour={interval.end_time.hour}
                time={interval.end_time.time}
                onChangeHour={(val) =>
                  onChangeInterval('end_time', 'hour', val)
                }
                onChangeMinute={(val) =>
                  onChangeInterval('end_time', 'minute', val)
                }
                onChangeTime={(val) =>
                  onChangeInterval('end_time', 'time', val)
                }
              />
            </div>

            <StyleTimezoneDropdown
              onChange={(e) => onChangeTime('timezone', e.target.value)}
            >
              <option value='EDT'>EDT</option>
            </StyleTimezoneDropdown>

            <StyleAddIntervalButton
              onClick={(e) => {
                onAddTimeInterval(e)
              }}
            >
              Add interval
            </StyleAddIntervalButton>
          </div>

          {allIntervals &&
          Array.isArray(allIntervals) &&
          allIntervals.length > 0 &&
          allIntervals.filter((row) => row?.day === interval?.day).length >
            0 ? (
            <div className='viewDateTime'>
              {allIntervals.map((row, index) => {
                return (
                  <>
                    {row?.day === interval?.day ? (
                      <div
                        onClick={() => {
                          onRemoveInterval(index)
                        }}
                        className='viewRow'
                        key={index}
                      >
                        <div className='textContainer'>
                          <span>{row?.start_time?.hour}</span>
                          <span>:</span>
                          <span>{row?.start_time?.minute}</span>
                          <span>{row?.start_time?.time}</span>

                          <span>-</span>
                          <span>{row?.end_time?.hour}</span>
                          <span>:</span>
                          <span>{row?.end_time?.minute}</span>
                          <span>{row?.end_time?.time}</span>
                        </div>

                        <div className='buttonContainer'>
                          <img src={DeleteIcon} />
                        </div>
                      </div>
                    ) : null}
                  </>
                )
              })}
            </div>
          ) : null}
        </div>
      </StyleDayTimeContainer>
      <StyleNextButtonContainer>
        <StyleNextButton
          onClick={(e) => {
            handleNextButtonClick(e)
          }}
          disabled={availabilityApi.isLoading}
        >
          {availabilityApi.isLoading ? `Loading...` : `Next`}
        </StyleNextButton>
      </StyleNextButtonContainer>
    </>
  )
}

export default Availability
