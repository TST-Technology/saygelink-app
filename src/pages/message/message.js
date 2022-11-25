import React, { useState } from 'react'
import SearchImage from '../../assets/images/search.svg'
import PersonImage from '../../assets/images/person.png'
import CalenderRedImage from '../../assets/images/calendar-red.svg'
import SendImage from '../../assets/images/send.svg'
import {
  ChatInputHeight,
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
  DashboardHeaderHeight,
  DATE_FORMAT,
  scheduleMeetingStyle,
  SOCKET_EVENTS
} from '../../utils/constants'
import useHttp from '../../hooks/use-http'
import { useEffect } from 'react'
import {
  capitalizeFirstLetter,
  dateFormat,
  isEmptyArray
} from '../../utils/funcs'
import Loader from '../../components/general/loader'
import { socket } from '../../utils/socket'
import { useContext } from 'react'
import { UserContext } from '../../context/user'
import { useRef } from 'react'

const Message = () => {
  const messageApi = useHttp()
  const conversationListApi = useHttp()
  const sendMessageApi = useHttp()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [messages, setMessages] = useState(null)
  const [activeUser, setActiveUser] = useState(null)
  const [conversationList, setConversationList] = useState(null)
  const [message, setMessage] = useState('')
  const { profileDetail } = useContext(UserContext)
  const messageRef = useRef()

  useEffect(() => {
    // getMessage()
    getConversationList()

    socket.on(SOCKET_EVENTS.CONNECT, (socket) => {
      console.log('connected', socket)
    })

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log('disconnected')
    })

    socket.on(SOCKET_EVENTS.RECEIVE_NOTIFICATION, (notification) => {
      console.log(SOCKET_EVENTS.RECEIVE_NOTIFICATION, notification)
    })

    socket.on(SOCKET_EVENTS.ONLINE_USERS, (id) => {
      console.log(id)
    })

    socket.onAny((eventName, ...args) => {
      console.log('any =>', eventName)
    })

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT)
      socket.off(SOCKET_EVENTS.DISCONNECT)
      socket.off(SOCKET_EVENTS.RECEIVE_NOTIFICATION)
      socket.off(SOCKET_EVENTS.ONLINE_USERS)
      socket.offAny(() => {})
    }
  }, [])

  useEffect(() => {
    if (activeUser?._id) {
      getMessage(activeUser?._id)
    }
  }, [activeUser])

  const responseHandler = (resp) => {
    if (resp && !isEmptyArray(resp?.messages)) {
      setMessages(resp?.messages)
      scrollToLastMessage()
    }
  }

  const getMessage = (userId = '62cf74363959f43b15e3d838') => {
    const url = {
      ...CONSTANT.API.getAllMessages,
      endpoint: CONSTANT.API.getAllMessages.endpoint.replace(':userId', userId)
    }
    messageApi.sendRequest(url, responseHandler)
  }

  const conversationListResponseHandler = (resp) => {
    if (resp && !isEmptyArray(resp?.conversations)) {
      setConversationList(resp?.conversations)
    }
  }

  const getConversationList = () => {
    conversationListApi.sendRequest(
      CONSTANT.API.getConversationList,
      conversationListResponseHandler
    )
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (e) => {
    setAnchorEl(null)
  }

  const sendMessageResponseHandler = (res) => {
    if (res) {
    }
  }

  const sendMessage = () => {
    if (profileDetail?.id && activeUser?._id && message) {
      const payload = {
        message: message,
        sender: profileDetail?.id
      }
      const url = {
        ...CONSTANT.API.addMessage,
        endpoint: CONSTANT.API.addMessage.endpoint.replace(
          ':conversationId',
          activeUser?._id
        )
      }
      const temp = {
        fromSelf: true,
        id: Date.now(),
        message: message,
        timestamp: new Date()
      }
      setMessage('')
      setMessages((prevValue) => {
        return [...prevValue, temp]
      })
      scrollToLastMessage()
      sendMessageApi.sendRequest(url, sendMessageResponseHandler, payload)
    }
  }

  const scrollToLastMessage = () => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }, 100)
  }

  return (
    <>
      {conversationListApi.isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
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

                  {!isEmptyArray(conversationList)
                    ? conversationList.map((user, index) => {
                        const currentUser = user?.participants[1]
                        return (
                          <UserChatStyle
                            key={index}
                            onClick={() => {
                              setActiveUser(user)
                            }}
                            selected={user?._id === activeUser?._id}
                          >
                            <div className='leftContainer'>
                              <img
                                src={currentUser?.profile_image}
                                className='profileImage'
                              />
                              <div className='activeUser'></div>
                              <div className='nameContainer'>
                                <p className='nameText'>{currentUser?.name}</p>
                                <span className='roleText'>
                                  {currentUser?.qualification
                                    ? capitalizeFirstLetter(
                                        currentUser?.qualification
                                      )
                                    : ''}
                                </span>
                              </div>
                            </div>

                            <div className='rightContainer'>
                              {index === 0 ? (
                                <div className='unreadMessage'></div>
                              ) : null}
                            </div>
                          </UserChatStyle>
                        )
                      })
                    : null}
                </div>
              </div>

              <div className='rightSectionContainer'>
                {activeUser ? (
                  <>
                    <div className='rightSection'>
                      <div className='activeChatNameContainer'>
                        <div className='leftContainer'>
                          <img
                            src={activeUser?.participants[1]?.profile_image}
                            className='profileImage'
                          />
                          <div className='nameContainer'>
                            <p className='nameText'>
                              {activeUser?.participants[1]?.name}
                            </p>
                            <span className='roleText'>
                              {activeUser?.participants[1]?.qualification
                                ? capitalizeFirstLetter(
                                    activeUser?.participants[1]?.qualification
                                  )
                                : null}
                            </span>
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
                        {messageApi.isLoading ? (
                          <Loader height={`calc(100% - ${ChatInputHeight})`} />
                        ) : (
                          <div className='chatMessagesContainer'>
                            <p className='chatDateText'>Today</p>
                            {!isEmptyArray(messages)
                              ? messages.map((message, index) => {
                                  return (
                                    <MessageStyle
                                      sent={message?.fromSelf}
                                      key={message.id}
                                      ref={
                                        index === messages.length - 1
                                          ? messageRef
                                          : null
                                      }
                                    >
                                      <p className='messageHelperText'>
                                        {dateFormat(
                                          message?.timestamp,
                                          DATE_FORMAT.FORMAT_3
                                        )}
                                      </p>
                                      <p className='messageText'>
                                        {message?.message}
                                      </p>
                                      {/* <p className='messageHelperText'>VIEWED AT</p> */}
                                    </MessageStyle>
                                  )
                                })
                              : null}
                          </div>
                        )}
                        <div className='chatInputContainer'>
                          <MessageInputStyle
                            placeholder='Text Messages....'
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value)
                            }}
                          />

                          <SendButtonStyle
                            onClick={() => {
                              sendMessage()
                            }}
                          >
                            <img src={SendImage} /> Send
                          </SendButtonStyle>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
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
      )}
    </>
  )
}

export default Message
