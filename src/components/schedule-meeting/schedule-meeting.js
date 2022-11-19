import React from 'react'
import PersonImage from '../../assets/images/person.png'
import {
  DateInputStyle,
  MessageTextAreaStyle,
  ScheduleMeetingStyle,
  SubmitButtonStyle,
  TimezoneDropdownStyle
} from '../../style-component/message/schedule-meeting'
import CONSTANT from '../../utils/constants'

const ScheduleMeeting = () => {
  return (
    <ScheduleMeetingStyle>
      <div className='profileContainer'>
        <img className='profileImage' src={PersonImage} />

        <div className='rightTextContainer'>
          <h2>James Mary</h2>

          <p>
            Well being | Healthcare Innovation | Student Sundry | Career
            Interests
          </p>
        </div>
      </div>
      <div className='cardMeeting'>
        <p className='heading'>General Availability</p>

        <div className='weekDayContainer'>
          {CONSTANT.WEEK_DIGIT.map((day, index) => {
            return (
              <div
                className={`weekDay ${index == 3 ? 'selectedWeekDay' : ''}`}
                key={index}
              >
                <span>{day.substring(0, 2)}</span>
              </div>
            )
          })}
        </div>

        <div className='timeContainer'>
          <p className='textText'>09:00 AM to 10:00 AM </p>
          <p className='textText'>11:00 AM to 01:00 PM </p>
        </div>
      </div>

      <div className='cardMeeting'>
        <p className='heading'>Add a Message</p>
        <MessageTextAreaStyle placeholder='Enter your Messages' />
      </div>

      <div className='cardMeeting'>
        <p className='heading'>Select time zone</p>
        <TimezoneDropdownStyle>
          <option>EDT</option>
        </TimezoneDropdownStyle>
      </div>

      <div className='cardMeeting'>
        <p className='heading'>Option 1</p>

        <div className='cardCol2'>
          <DateInputStyle type='date' placeholder='Select date' />

          <DateInputStyle type='time' placeholder='Select time' />
        </div>

        <p className='heading'>Option 2</p>

        <div className='cardCol2'>
          <DateInputStyle type='date' placeholder='Select date' />

          <DateInputStyle type='time' placeholder='Select time' />
        </div>

        <p className='heading'>Option 3</p>

        <div className='cardCol2'>
          <DateInputStyle type='date' placeholder='Select date' />

          <DateInputStyle type='time' placeholder='Select time' />
        </div>
      </div>

      <SubmitButtonStyle>Submit</SubmitButtonStyle>
    </ScheduleMeetingStyle>
  )
}

export default ScheduleMeeting
