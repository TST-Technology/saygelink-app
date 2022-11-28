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
  KEYBOARD,
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
import ImageRole from '../../components/general/image-role'

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
  const [unseenMessageUsers, setUnseenMessageUsers] = useState({})

  const todayLabelDate = dateFormat(new Date(), DATE_FORMAT.FORMAT_5)

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

    socket.on(SOCKET_EVENTS.ONLINE_USERS, (no) => {
      handleOnlineUser(no)
    })

    socket.on(SOCKET_EVENTS.MESSAGE_RECEIVE, (msg) => {
      handleNewMessage(msg, false)
    })

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT)
      socket.off(SOCKET_EVENTS.DISCONNECT)
      socket.off(SOCKET_EVENTS.RECEIVE_NOTIFICATION)
      socket.off(SOCKET_EVENTS.ONLINE_USERS)
      socket.off(SOCKET_EVENTS.MESSAGE_RECEIVE)
    }
  }, [])

  useEffect(() => {
    if (activeUser?._id) {
      getMessage(activeUser?._id)
      const addUser = {
        to: [activeUser?._id],
        user_id: profileDetail?.id
      }
      socket.emit(SOCKET_EVENTS.ADD_USER, addUser)
    }
  }, [activeUser])

  const responseHandler = (resp) => {
    const uniqueTimeStamp = {}
    const uniqueDate = {}
    if (resp && !isEmptyArray(resp?.messages)) {
      const tempMessages = resp?.messages.map((mes) => {
        const format = dateFormat(mes.timestamp, DATE_FORMAT.FORMAT_1)
        if (!uniqueTimeStamp[format]) {
          mes.uniqueTimeStamp = mes.timestamp
          uniqueTimeStamp[format] = true
        }
        const format2 = dateFormat(mes.timestamp, DATE_FORMAT.FORMAT_5)

        if (!uniqueDate[format2]) {
          mes.uniqueDate = mes.timestamp
          uniqueDate[format2] = true
        }
        return mes
      })
      console.log(tempMessages)
      setMessages(tempMessages)
      scrollToLastMessage()
    }
  }

  const getMessage = (userId) => {
    const url = {
      ...CONSTANT.API.getAllMessages,
      endpoint: CONSTANT.API.getAllMessages.endpoint.replace(':userId', userId)
    }
    messageApi.sendRequest(url, responseHandler)
  }

  const conversationListResponseHandler = (resp) => {
    if (resp && !isEmptyArray(resp?.conversations)) {
      const tempUnreadUser = {}
      const temp = resp?.conversations.map((row) => {
        const tempParticipant = row.participants.filter(
          (part) => part.iam_user === false
        )
        const unreadUser = row.participants.filter(
          (part) => part.unseen_messages === 'true'
        )
        if (!isEmptyArray(unreadUser))
          tempUnreadUser[tempParticipant[0]?._id] = true

        row.participants = { ...tempParticipant[0] }
        return row
      })
      setUnseenMessageUsers({ ...tempUnreadUser })
      setConversationList(temp)
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
    const toId = activeUser?.participants?._id
    const fromId = profileDetail?.id
    if (fromId && toId && message.trim()) {
      const socketMessage = {
        to: [toId],
        message: message,
        user_id: fromId
      }
      handleNewMessage(message, true)
      addMessageApi()
      socket.emit(SOCKET_EVENTS.SEND_MESSAGE, socketMessage)
    }
  }

  const addMessageApi = () => {
    const url = {
      ...CONSTANT.API.addMessage,
      endpoint: CONSTANT.API.addMessage.endpoint.replace(
        ':conversationId',
        activeUser?._id
      )
    }
    const payload = {
      message: message,
      sender: profileDetail?.id
    }
    sendMessageApi.sendRequest(url, sendMessageResponseHandler, payload)
  }

  const scrollToLastMessage = () => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({})
    }, 100)
  }

  const handleUserChange = (user) => {
    setActiveUser(user)
    setUnseenMessageUsers((prevValue) => {
      delete prevValue[user?.participants?._id]
      return prevValue
    })
  }

  const handleKeyEvent = (e) => {
    if (e.key === KEYBOARD.ENTER) {
      sendMessage()
    }
  }

  const getDayLabel = (date) => {
    const formattedDate = dateFormat(date, DATE_FORMAT.FORMAT_5)

    if (todayLabelDate === formattedDate) {
      return 'Today'
    } else {
      return formattedDate
    }
  }

  //  Socket Handlers

  const handleOnlineUser = (no) => {
    console.log('online-users', no)
  }

  const handleNewMessage = (message, isSend = true) => {
    const currentDateTime = new Date()
    const temp = {
      fromSelf: isSend,
      id: Date.now(),
      message: message,
      timestamp: currentDateTime,
      uniqueTimeStamp: currentDateTime
    }
    if (isSend) setMessage('')
    setMessages((prevValue) => {
      return [...prevValue, temp]
    })
    scrollToLastMessage()
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
                        const currentUser = user?.participants
                        return (
                          <UserChatStyle
                            key={index}
                            onClick={() => {
                              handleUserChange(user)
                            }}
                            selected={user?._id === activeUser?._id}
                          >
                            <div className='leftContainer'>
                              <ImageRole
                                src={currentUser?.profile_image}
                                className='profileImage'
                                role={currentUser?.qualification}
                              />
                              {/* <div className='activeUser'></div> */}
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
                              {unseenMessageUsers[currentUser?._id] ? (
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
                          <ImageRole
                            src={activeUser?.participants?.profile_image}
                            className='profileImage'
                            role={activeUser?.participants?.qualification}
                          />
                          <div className='nameContainer'>
                            <p className='nameText'>
                              {activeUser?.participants?.name}
                            </p>
                            <span className='roleText'>
                              {activeUser?.participants?.qualification
                                ? capitalizeFirstLetter(
                                    activeUser?.participants?.qualification
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
                            {!isEmptyArray(messages)
                              ? messages.map((message, index) => {
                                  return (
                                    <>
                                      {message?.uniqueDate ? (
                                        <p className='chatDateText'>
                                          {getDayLabel(message?.uniqueDate)}
                                        </p>
                                      ) : null}
                                      <MessageStyle
                                        sent={message?.fromSelf}
                                        key={message.id}
                                      >
                                        {message?.uniqueTimeStamp ? (
                                          <p className='messageHelperText'>
                                            {dateFormat(
                                              message?.uniqueTimeStamp,
                                              DATE_FORMAT.FORMAT_3
                                            )}
                                          </p>
                                        ) : null}
                                        <p className='messageText'>
                                          {message?.message}
                                        </p>
                                        {/* <p className='messageHelperText'>VIEWED AT</p> */}
                                      </MessageStyle>
                                    </>
                                  )
                                })
                              : null}
                            <div ref={messageRef}></div>
                          </div>
                        )}
                        <div className='chatInputContainer'>
                          <MessageInputStyle
                            placeholder='Text Messages....'
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value)
                            }}
                            onKeyDown={handleKeyEvent}
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
