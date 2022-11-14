import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import ArrowLeft from '../../assets/images/arrow-left.svg'
import PersonImage from '../../assets/images/person.png'
import ArrowLeftDark from '../../assets/images/arrow-left-dark.svg'
import CalenderImage from '../../assets/images/calendar-dark.svg'
import RescheduleImage from '../../assets/images/reschedule.svg'
import SendDarkImage from '../../assets/images/send-dark.svg'
import CustomCalender from '../../components/custom-calender/custom-calender'
import {
  CalenderContainerStyle,
  CalenderEventButtonStyle,
  ReactCalenderStyle
} from '../../style-component/calender/calender'

const Calender = () => {
  const [value, setValue] = useState(new Date())

  const EVENTS = [
    {
      image: <img src={PersonImage} />,
      title: 'Zoe Jones',
      subTitle: '14 Jan 2022 10:00 pm (Hawaii)',
      link: 'www.googlemeet.com/eufbeufu/o40i',
      time: '08:00 AM'
    },
    {
      image: <img src={PersonImage} />,
      title: 'Zoe Jones',
      subTitle: '14 Jan 2022 10:00 pm (Hawaii)',
      link: 'www.googlemeet.com/eufbeufu/o40i',
      time: '08:00 AM'
    },
    {
      image: <img src={PersonImage} />,
      title: 'Zoe Jones',
      subTitle: '14 Jan 2022 10:00 pm (Hawaii)',
      link: 'www.googlemeet.com/eufbeufu/o40i',
      time: '08:00 AM'
    },
    {
      image: <img src={PersonImage} />,
      title: 'Zoe Jones',
      subTitle: '14 Jan 2022 10:00 pm (Hawaii)',
      link: 'www.googlemeet.com/eufbeufu/o40i',
      time: '08:00 AM'
    },
    {
      image: <img src={PersonImage} />,
      title: 'Zoe Jones',
      subTitle: '14 Jan 2022 10:00 pm (Hawaii)',
      link: 'www.googlemeet.com/eufbeufu/o40i',
      time: '08:00 AM'
    },
    {
      image: <img src={PersonImage} />,
      title: 'Zoe Jones',
      subTitle: '14 Jan 2022 10:00 pm (Hawaii)',
      link: 'www.googlemeet.com/eufbeufu/o40i',
      time: '08:00 AM'
    }
  ]

  return (
    <CalenderContainerStyle>
      <div className='calenderPageContainer'>
        <div className='calenderLeft'>
          <CustomCalender onChange={setValue} value={value} />
        </div>

        <div className='calenderRight'>
          <div className='calenderPreviewHeader'>
            <div className='calenderPreviewHeaderSectionContainer'>
              <div className='calenderPreviewHeaderSection'>
                <img src={CalenderImage} />

                <p>Aug 15, 2022</p>
              </div>

              <div className='calenderPreviewHeaderSection'>
                <img src={ArrowLeftDark} />
                <img
                  style={{ transform: 'rotate(180deg)' }}
                  src={ArrowLeftDark}
                />
              </div>
            </div>
          </div>
          <div className='calenderPreviewBody'>
            <div className='calenderPreviewEventsContainer'>
              {EVENTS.map((event, index) => {
                return (
                  <div className='calenderPreviewEventSection' key={index}>
                    <div className='calenderPreviewEventsLeft'>
                      <p>{event.time}</p>
                    </div>
                    <div className='calenderPreviewEventsRight'>
                      <div className='calenderPreviewEventCard'>
                        <div className='calenderPreviewEventCardLeft'>
                          <div className='calenderPreviewEventImageContainer'>
                            {event.image}
                          </div>
                          <div className='calenderPreviewEventTitleContainer'>
                            <h3 className='heading'>{event.title}</h3>

                            <p>{event.subTitle}</p>
                            <a href={event.link}>{event.link}</a>
                          </div>
                        </div>
                        <div className='calenderPreviewEventCardRight'>
                          <CalenderEventButtonStyle>
                            <img src={RescheduleImage} />
                            Re-schedule
                          </CalenderEventButtonStyle>
                          <CalenderEventButtonStyle>
                            <img src={SendDarkImage} />
                            Join
                          </CalenderEventButtonStyle>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </CalenderContainerStyle>
  )
}

export default Calender
