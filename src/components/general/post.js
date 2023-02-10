import React, { useState } from "react";
import { MenuItem } from "@mui/material";
import { PostStyle, StylePostMenu } from "../../style-component/post/post";
import ThreeDotImage from "../../assets/images/threeDotMenu.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const Post = ({
  name,
  profileId,
  time,
  description,
  image,
  postImage,
  authorId,
  onDeletePost,
  isOptionsVisible
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const nav = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProfileClick = () => {
    if (authorId) {
      nav(ROUTES.MEMBER.replace(":memberId", authorId));
    }
  };

  const handleDeletePost = () => {
    onDeletePost();
    handleClose();
  };

  return (
    <PostStyle>
      <div className='individualPost'>
        <div className='leftSidePostHeader' onClick={onProfileClick}>
          <div className='postImageContainer'>
            <img src={image} />
          </div>
          <div className='postNameContainer'>
            <p className='postName'>{name}</p>
            <span className='postTime'>{time}</span>
          </div>
        </div>

        {isOptionsVisible ? (
          <>
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
                "aria-labelledby": "basic-button"
              }}
            >
              <MenuItem
                onClick={() => {
                  handleDeletePost();
                }}
              >
                Delete post
              </MenuItem>
            </StylePostMenu>
          </>
        ) : null}
      </div>
      <div className='mainImageDiv'>
        {postImage ? <img src={postImage} className='postImage' /> : null}
      </div>
      <div
        className='postDescription'
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </PostStyle>
  );
};

Post.defaultProps = {
  isOptionsVisible: false
};

export default Post;
