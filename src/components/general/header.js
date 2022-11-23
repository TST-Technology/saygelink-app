import React, { useState } from 'react'
import {
  HeaderContainerStyle,
  NotificationContainerStyle
} from '../../style-component/header'
import columbiaLogo from '../../assets/images/columbiaHeaderLogo.png'
import HomeLogo from '../../assets/images/home.svg'
import MessageLogo from '../../assets/images/message.svg'
import CalenderLogo from '../../assets/images/calendar.svg'
import GlobLogo from '../../assets/images/globe.svg'
import BellLogo from '../../assets/images/bell.svg'
import ProfileLogo from '../../assets/images/profile.svg'
import PersonImg from '../../assets/images/person.png'
import CONSTANT, { ROUTES } from '../../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import { Menu } from '@mui/material'
import Notification from './notification'
import { useEffect } from 'react'
import useHttp from '../../hooks/use-http'
import ConnectionRequest from './connection-request'
import { isEmptyArray } from '../../utils/funcs'
import { useContext } from 'react'
import { UserContext } from '../../context/user'

const Header = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const nav = useNavigate()
  const connectApi = useHttp()
  const [pendingRequestCount, setPendingRequestCount] = useState(null)
  const [floatMenuType, setFloatMenuType] = useState(null)
  const [requestDetail, setRequestDetail] = useState(null)
  const { profileDetail } = useContext(UserContext)
  console.log(profileDetail)

  useEffect(() => {
    setActiveTab(window.location.pathname)
  }, [window.location.pathname])

  useEffect(() => {
    getRequests()
  }, [])

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
    setFloatMenuType('notification')
    setAnchorEl(event.currentTarget)
  }

  const handleRequestClick = (event) => {
    console.log(requestDetail)
    if (!isEmptyArray(requestDetail)) {
      setFloatMenuType('request')
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = (e) => {
    setAnchorEl(null)
  }

  const handleHeaderClick = (tab) => {
    setActiveTab(tab.route)
    nav(tab.route)
  }

  const responseHandler = (resp) => {
    console.log(resp)
    if (resp && resp?.count && resp?.connections) {
      console.log('in')
      setPendingRequestCount(resp?.count)
      setRequestDetail(resp?.connections)
    }
  }

  const getRequests = () => {
    connectApi.sendRequest(CONSTANT.API.getConnectionRequest, responseHandler)
  }

  const handleLogoClick = () => {
    nav(ROUTES.HOME)
  }

  return (
    <HeaderContainerStyle>
      <div className='headerContainer'>
        <div
          className='leftSection'
          onClick={() => {
            handleLogoClick()
          }}
        >
          <img src={columbiaLogo} />
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
          <div className='width-30' onClick={handleClick}>
            <img src={BellLogo} className='headerImages' />
          </div>

          <div
            className='profileHeaderImageContainer width-30'
            onClick={handleRequestClick}
          >
            <img
              src={ProfileLogo}
              className='headerImages profileHeaderImage'
            />
            {!isEmptyArray(pendingRequestCount) ? (
              <div className='requestCount'>{pendingRequestCount}</div>
            ) : null}
          </div>

          <img
            onClick={() => {
              setActiveTab(null)
              nav(ROUTES.PROFILE)
            }}
            src={
              profileDetail?.profile_image
                ? profileDetail?.profile_image
                : PersonImg
            }
            className='headerImages profileImage'
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
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 15,
              right: 10,
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
        {floatMenuType === 'notification' ? <Notification /> : null}
        {floatMenuType === 'request' ? (
          <ConnectionRequest detail={requestDetail} getDetail={getRequests} />
        ) : null}
      </Menu>
    </HeaderContainerStyle>
  )
}

export default Header
