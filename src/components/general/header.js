import React, { useState } from 'react'
import {
  HeaderContainerStyle,
  NotificationContainerStyle
} from '../../style-component/header'
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
import { Menu } from '@mui/material'
import Notification from './notification'

const Header = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (e) => {
    setAnchorEl(null)
  }

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

          <img
            src={BellLogo}
            className='headerImages'
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          />

          <img src={ProfileLogo} className='headerImages' />

          <img
            onClick={() => {
              nav(ROUTES.PROFILE)
            }}
            src={PersonImg}
            className='headerImages'
          />
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '10px',
            boxShadow: 'none',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 15,
              right: 20,
              width: 40,
              height: 40,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Notification />
      </Menu>
    </HeaderContainerStyle>
  )
}

export default Header
