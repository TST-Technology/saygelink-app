import React from 'react'
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

const Message = () => {
  return (
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
                    {index === 0 ? <div className='unreadMessage'></div> : null}
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
              <p>Schedule a call</p>
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
  )
}

export default Message
