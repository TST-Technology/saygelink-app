import React, { useState } from 'react'
import { PostStyle, StylePostMenu } from '../../style-component/post/post'
import ThreeDotImage from '../../assets/images/threeDotMenu.svg'
import { MenuItem } from '@mui/material'

const Post = ({ name, time, description, image }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
          <div onClick={handleClick}>
            <img src={ThreeDotImage} />
          </div>
        </div>

        <StylePostMenu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleClose}>Report post</MenuItem>
        </StylePostMenu>
      </div>

      <div
        className='postDescription'
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </PostStyle>
  )
}

export default Post
