import React from 'react'
import { MessageContainerStyle } from '../../style-component/message/message'

const Message = () => {
  return (
    <MessageContainerStyle>
      <div className='messageContainer'>
        <div className='leftSection'>
          <div className='membersHeadingContainer'>
            <h2 className='membersHeading'>Members</h2>
          </div>
        </div>

        <div className='rightSection'></div>
      </div>
    </MessageContainerStyle>
  )
}

export default Message
