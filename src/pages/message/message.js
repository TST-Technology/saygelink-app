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
import CONSTANT, {
  DATE_FORMAT,
  scheduleMeetingStyle
} from '../../utils/constants'
import useHttp from '../../hooks/use-http'
import { useEffect } from 'react'
import { dateFormat, isEmptyArray } from '../../utils/funcs'

const Message = () => {
  const messageApi = useHttp()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    getMessage()
  }, [])

  const responseHandler = (resp) => {
    console.log(resp)
    if (resp && !isEmptyArray(resp?.messages)) {
      setMessages(resp?.messages)
    }
  }

  const getMessage = (userId = '62cf74363959f43b15e3d838') => {
    const url = {
      ...CONSTANT.API.getAllMessages,
      endpoint: CONSTANT.API.getAllMessages.endpoint.replace(':userId', userId)
    }
    messageApi.sendRequest(url, responseHandler)
  }

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
                {!isEmptyArray(messages)
                  ? messages.map((message) => {
                      return (
                        <MessageStyle sent={message?.fromSelf} key={message.id}>
                          <p className='messageHelperText'>
                            {dateFormat(
                              message?.timestamp,
                              DATE_FORMAT.FORMAT_3
                            )}
                          </p>
                          <p className='messageText'>{message?.message}</p>
                          {/* <p className='messageHelperText'>VIEWED AT</p> */}
                        </MessageStyle>
                      )
                    })
                  : null}
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
          sx: scheduleMeetingStyle
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
