import React, { useState } from "react";
import { MenuItem } from "@mui/material";
import { PostStyle, StylePostMenu } from "../../style-component/post/post";
import ThreeDotImage from "../../assets/images/threeDotMenu.svg";

const Post = ({ name, profileId, time, description, image, postImage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <PostStyle>
      <div className="individualPost">
        <div className="leftSidePostHeader">
          <div className="postImageContainer">
            <img src={image} />
          </div>
          <div className="postNameContainer">
            <p className="postName">{name}</p>
            <span className="postTime">{time}</span>
          </div>
        </div>

        <div className="rightSidePostHeader">
          <div onClick={handleClick}>
            <img src={ThreeDotImage} />
          </div>
        </div>

        <StylePostMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Report post</MenuItem>
        </StylePostMenu>
      </div>
      <div className="mainImageDiv">
        {postImage ? <img src={postImage} className="postImage" /> : null}
      </div>
      <div
        className="postDescription"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </PostStyle>
  );
};

export default Post;
