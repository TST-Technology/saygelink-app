import React, { useState } from 'react'
import SearchImage from '../../assets/images/search.svg'
import PersonImage from '../../assets/images/person.png'
import CalenderRedImage from '../../assets/images/calendar-red.svg'
import SendImage from '../../assets/images/send.svg'
import {
  MessageContainerStyle,
  MessageInputStyle,
  MessageStyle,
  SearchInputStyle,
  SendButtonStyle,
  UserChatStyle
} from '../../style-component/message/message'
import { Menu } from '@mui/material'
import ScheduleMeeting from '../../components/schedule-meeting/schedule-meeting'

const Message = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (e) => {
    setAnchorEl(null)
  }

  return (
    <>
      <MessageContainerStyle>
        <div className='messageContainer'>
          <div className='leftSection'>
            <div className='membersHeadingContainer'>
              <h2 className='membersHeading'>Members</h2>
            </div>
            <div className='membersChatListing'>
              <img src={SearchImage} className='searchImage' />
              <SearchInputStyle placeholder='Search here...' />

              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100].map((row, index) => {
                return (
                  <UserChatStyle key={index} selected={index === 0}>
                    <div className='leftContainer'>
                      <img src={PersonImage} className='profileImage' />
                      <div className='activeUser'></div>
                      <div className='nameContainer'>
                        <p className='nameText'>Carla Houston</p>
                        <span className='roleText'>Student</span>
                      </div>
                    </div>

                    <div className='rightContainer'>
                      {index === 0 ? (
                        <div className='unreadMessage'></div>
                      ) : null}
                    </div>
                  </UserChatStyle>
                )
              })}
            </div>
          </div>

          <div className='rightSection'>
            <div className='activeChatNameContainer'>
              <div className='leftContainer'>
                <img src={PersonImage} className='profileImage' />
                <div className='nameContainer'>
                  <p className='nameText'>Carla Houston</p>
                  <span className='roleText'>Student</span>
                </div>
              </div>

              <div className='rightContainer'>
                <img src={CalenderRedImage} />
                <p
                  onClick={handleClick}
                  size='small'
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                >
                  Schedule a call
                </p>
              </div>
            </div>

            <div className='chatContainer'>
              <div className='chatMessagesContainer'>
                <p className='chatDateText'>Today</p>

                <MessageStyle sent={true}>
                  <p className='messageHelperText'>12:30 AM</p>
                  <p className='messageText'>Hello !</p>
                  <p className='messageHelperText'>VIEWED AT</p>
                </MessageStyle>

                <MessageStyle sent={false}>
                  <p className='messageHelperText'>12:30 AM</p>
                  <p className='messageText'>Hello !</p>
                  <p className='messageText'>How are you ?</p>
                </MessageStyle>

                <MessageStyle sent={true}>
                  <p className='messageHelperText'>12:30 AM</p>
                  <p className='messageText'>Hello !</p>
                  <p className='messageText'>How are you ?</p>
                  <p className='messageHelperText'>VIEWED AT</p>
                </MessageStyle>

                <MessageStyle sent={false}>
                  <p className='messageHelperText'>12:30 AM</p>
                  <p className='messageText'>i am also fine.</p>
                  <p className='messageText'>Thank you</p>
                </MessageStyle>

                <MessageStyle sent={true}>
                  <p className='messageHelperText'>12:30 AM</p>
                  <p className='messageText'>Welcome</p>
                  <p className='messageHelperText'>VIEWED AT</p>
                </MessageStyle>

                <MessageStyle sent={false}>
                  <p className='messageHelperText'>12:30 AM</p>
                  <p className='messageText'>i am also fine.</p>
                  <p className='messageText'>Thank you</p>
                </MessageStyle>

                <MessageStyle sent={true}>
                  <p className='messageHelperText'>12:30 AM</p>
                  <p className='messageText'>Welcome</p>
                  <p className='messageHelperText'>VIEWED AT</p>
                </MessageStyle>
              </div>
              <div className='chatInputContainer'>
                <MessageInputStyle placeholder='Text Messages....' />

                <SendButtonStyle>
                  <img src={SendImage} /> Send
                </SendButtonStyle>
              </div>
            </div>
          </div>
        </div>
      </MessageContainerStyle>

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
              top: 0,
              right: 24,
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
        <ScheduleMeeting />
      </Menu>
    </>
  )
}

export default Message
