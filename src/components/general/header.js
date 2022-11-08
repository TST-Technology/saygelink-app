import React, { useState } from 'react'
import { HeaderContainerStyle } from '../../style-component/header'
import shortLogo from '../../assets/images/short_logo.png'
import HomeLogo from '../../assets/images/home.svg'
import MessageLogo from '../../assets/images/message.svg'
import CalenderLogo from '../../assets/images/calendar.svg'
import GlobLogo from '../../assets/images/globe.svg'
import BellLogo from '../../assets/images/bell.svg'
import ProfileLogo from '../../assets/images/profile.svg'
import PersonImg from '../../assets/images/person.png'
import { ROUTES } from '../../utils/constants'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname)
  const nav = useNavigate()
  const HEADER_TABS = [
    {
      label: 'Home',
      icon: HomeLogo,
      route: ROUTES.HOME
    },
    {
      label: 'Message',
      icon: MessageLogo,
      route: ROUTES.MESSAGE
    },
    {
      label: 'Calender',
      icon: CalenderLogo,
      route: ROUTES.CALENDER
    },
    {
      label: 'Network',
      icon: GlobLogo,
      route: ROUTES.NETWORK
    }
  ]

  const handleHeaderClick = (tab) => {
    setActiveTab(tab.route)
    nav(tab.route)
  }

  return (
    <HeaderContainerStyle>
      <div className='headerContainer'>
        <div className='leftSection'>
          <img src={shortLogo} />

          <p>Sayge Link</p>
        </div>

        <div className='rightSection'>
          {HEADER_TABS.map((tab, index) => {
            return (
              <div
                key={tab.label}
                className={`headerTab ${
                  activeTab === tab.route ? 'activeHeader' : ''
                }`}
                onClick={() => {
                  handleHeaderClick(tab)
                }}
              >
                <img className='headerTabImage' src={tab.icon} />

                {tab.label ? (
                  <p className='headerTabTitle'>{tab.label}</p>
                ) : null}
              </div>
            )
          })}

          <img src={BellLogo} className='headerImages' />

          <img src={ProfileLogo} className='headerImages' />

          <img src={PersonImg} className='headerImages' />
        </div>
      </div>
    </HeaderContainerStyle>
  )
}

export default Header
