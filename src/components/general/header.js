import React from 'react'
import { HeaderContainerStyle } from '../../style-component/header'
import shortLogo from '../../assets/images/short_logo.png'
import HomeLogo from '../../assets/images/home.svg'
import MessageLogo from '../../assets/images/message.svg'
import CalenderLogo from '../../assets/images/calendar.svg'
import GlobLogo from '../../assets/images/globe.svg'
import BellLogo from '../../assets/images/bell.svg'
import ProfileLogo from '../../assets/images/profile.svg'
import PersonImg from '../../assets/images/person.png'

const Header = () => {
  const HEADER_TABS = [
    {
      label: 'Home',
      icon: HomeLogo
    },
    {
      label: 'Message',
      icon: MessageLogo
    },
    {
      label: 'Calender',
      icon: CalenderLogo
    },
    {
      label: 'Network',
      icon: GlobLogo
    }
  ]
  return (
    <HeaderContainerStyle>
      <div className='headerContainer'>
        <div className='leftSection'>
          <img src={shortLogo} />

          <p>Sayge Link</p>
        </div>

        <div className='rightSection'>
          {HEADER_TABS.map((tab) => {
            return (
              <div key={tab.label} className='headerTab'>
                <img className='headerTabImage' src={tab.icon} />

                {tab.label ? (
                  <p className='headerTabTitle'>{tab.label}</p>
                ) : null}
              </div>
            )
          })}

          <img src={BellLogo} />

          <img src={ProfileLogo} />

          <img src={PersonImg} />
        </div>
      </div>
    </HeaderContainerStyle>
  )
}

export default Header
