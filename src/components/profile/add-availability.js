import React, { useState } from 'react'
import useHttp from '../../hooks/use-http'
import { AddAvailabilityStyle } from '../../style-component/member/member'
import { SaveChangesButtonStyle } from '../../style-component/profile/edit-profile'
import CONSTANT from '../../utils/constants'
import { notify } from '../../utils/funcs'
import TimePicker from '../create-account/time-picker'

const AddAvailability = ({ selectedWeekday, onClose }) => {
  const INIT_TIME = {
    hour: '',
    minute: '',
    time: 'AM'
  }
  const profileApi = useHttp()
  const [interval, setInterval] = useState(() => {
    return {
      start_time: JSON.parse(JSON.stringify(INIT_TIME)),
      end_time: JSON.parse(JSON.stringify(INIT_TIME)),
      timezone: 'EDT'
    }
  })

  const onChangeInterval = (key, subKey, value) => {
    setInterval((prevValue) => {
      const temp = prevValue

      if (temp) {
        temp[key][subKey] = value

        return { ...JSON.parse(JSON.stringify(temp)) }
      }
    })
  }

  const handleAddAvailability = () => {
    if (
      interval &&
      selectedWeekday &&
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
      if (
        interval?.start_time?.time === 'PM' &&
        interval?.end_time?.time === 'AM'
      ) {
        notify.error('Please enter valid time')
        return
      }

      if (
        (interval?.start_time?.time === 'AM' &&
          interval?.end_time?.time === 'AM') ||
        (interval?.start_time?.time === 'PM' &&
          interval?.end_time?.time === 'PM')
      ) {
        if (interval?.start_time?.hour === interval?.end_time?.hour) {
          if (interval?.start_time?.minute >= interval?.end_time?.minute) {
            notify.error('Please enter valid time')
            return
          }
        }

        if (interval?.start_time?.hour > interval?.end_time?.hour) {
          notify.error('Please enter valid time')
          return
        }
      }

      const tempAvail = {}
      tempAvail.start_time = `${interval.start_time.hour}:${interval.start_time.minute}${interval.start_time.time}`
      tempAvail.end_time = `${interval.end_time.hour}:${interval.end_time.minute}${interval.end_time.time}`
      tempAvail.day = selectedWeekday
      tempAvail.timezone = interval.timezone
      const payload = {
        availability: tempAvail
      }

      profileApi.sendRequest(
        CONSTANT.API.addAvailability,
        () => onClose(true),
        payload,
        'Availability added successfully!'
      )
    } else {
      // if (
      //   !interval.start_time ||
      //   !interval?.start_time?.hour ||
      //   !interval?.start_time?.minute ||
      //   !interval?.start_time?.time
      // ) {
      //   notify.error('Please enter start time!')
      // } else {
      notify.error('Please enter start time, end time!')
      // }
    }
  }
  return (
    <AddAvailabilityStyle>
      <p className='timeLabel'>Start Time</p>
      <TimePicker
        name='startTime'
        minute={interval.start_time.minute}
        hour={interval.start_time.hour}
        time={interval.start_time.time}
        onChangeHour={(val) => onChangeInterval('start_time', 'hour', val)}
        onChangeMinute={(val) => onChangeInterval('start_time', 'minute', val)}
        onChangeTime={(val) => onChangeInterval('start_time', 'time', val)}
      />

      <p className='timeLabel mt-3'>End Time</p>
      <TimePicker
        name='endTime'
        minute={interval.end_time.minute}
        hour={interval.end_time.hour}
        time={interval.end_time.time}
        onChangeHour={(val) => onChangeInterval('end_time', 'hour', val)}
        onChangeMinute={(val) => onChangeInterval('end_time', 'minute', val)}
        onChangeTime={(val) => onChangeInterval('end_time', 'time', val)}
      />

      <div className='availabilityButtonContainer  mt-4'>
        <SaveChangesButtonStyle
          onClick={() => {
            handleAddAvailability()
          }}
        >
          Add Availability Slots
        </SaveChangesButtonStyle>
      </div>
    </AddAvailabilityStyle>
  )
}

export default AddAvailability
