import React from 'react'
import { PostStyle } from '../../style-component/post/post'
import ThreeDotImage from '../../assets/images/threeDotMenu.svg'

const Post = ({ name, time, description, image }) => {
  return (
    <PostStyle>
      <div className='individualPost'>
        <div className='leftSidePostHeader'>
          <div className='postImageContainer'>
            <img src={image} />
          </div>
          <div className='postNameContainer'>
            <p className='postName'>{name}</p>
            <span className='postTime'>{time}</span>
          </div>
        </div>

        <div className='rightSidePostHeader'>
          <img src={ThreeDotImage} />
        </div>
      </div>

      <div
        className='postDescription'
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </PostStyle>
  )
}

export default Post
