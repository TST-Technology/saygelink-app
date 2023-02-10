import { Collapse, IconButton } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PersonImage from "../../assets/images/person.png";
import RightArrow from "../../assets/images/RightArrow.svg";
import SearchImage from "../../assets/images/search.svg";
import { UserContext } from "../../context/user";
import useHttp from "../../hooks/use-http";
import { BottomFixedStyle } from "../../style-component/dashboard/message-floater";
import {
  MessageMemberList,
  SearchInputStyle,
  UserChatStyle,
} from "../../style-component/message/message";
import CONSTANT, { ROUTES } from "../../utils/constants";
import { capitalizeFirstLetter, isEmptyArray } from "../../utils/funcs";
import ImageRole from "./image-role";

const MessageFloater = () => {
  const [isOpen, setIsOpen] = useState(false);
  const conversationListApi = useHttp();
  const [unseenMessageUsers, setUnseenMessageUsers] = useState({});
  const [allConversationList, setAllConversationList] = useState([]);
  const [conversationList, setConversationList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();
  const { profileDetail } = useContext(UserContext);
  const unreadMessageCount = Object.keys(unseenMessageUsers).length;

  useEffect(() => {
    prepareSearchResult();
  }, [searchTerm]);

  useEffect(() => {
    getConversationList();
  }, []);

  const conversationListResponseHandler = (resp) => {
    if (resp && !isEmptyArray(resp?.conversations)) {
      const tempUnreadUser = {};
      const temp = resp?.conversations.map((row) => {
        const tempParticipant = row.participants.filter(
          (part) => part.iam_user === false
        );
        const unreadUser = row.participants.filter(
          (part) => part.unseen_messages === "true"
        );
        if (!isEmptyArray(unreadUser))
          tempUnreadUser[tempParticipant[0]?._id] = true;

        row.participants = { ...tempParticipant[0] };
        return row;
      });
      setUnseenMessageUsers({ ...tempUnreadUser });
      setConversationList(temp);
      setAllConversationList(temp);
    }
  };

  const getConversationList = () => {
    conversationListApi.sendRequest(
      CONSTANT.API.getConversationList,
      conversationListResponseHandler
    );
  };

  const handleUserChange = (user) => {
    nav(ROUTES.MESSAGE_TO.replace(":conversationId", user?._id));
  };

  const handleSearch = (e) => {
    if (e.target.value.trim === "") {
      setConversationList([...allConversationList]);
    } else {
      setSearchTerm(e.target.value);
    }
  };

  const prepareSearchResult = useCallback(async () => {
    if (searchTerm === "") {
      setConversationList([...allConversationList]);
    } else {
      if (searchTerm) {
        if (searchTerm) {
          const filteredDoctors = allConversationList.filter((row) => {
            return row?.participants?.name.indexOf(searchTerm) > -1;
          });
          setConversationList([...filteredDoctors]);
        }
      }
    }
  }, [searchTerm]);

  return (
    <BottomFixedStyle isOpen={isOpen}>
      {!isOpen ? (
        <div className="collapsedMenu">
          <div className="nameContainer">
            <ImageRole
              src={profileDetail?.profile_image}
              className="profileFloaterImage"
              role={profileDetail?.qualification}
            />
            <p>{profileDetail?.name}</p>
          </div>

          <div className="buttonContainer">
            {unreadMessageCount ? (
              <div className="count">{unreadMessageCount}</div>
            ) : null}
            <img
              src={RightArrow}
              className="arrow"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      ) : null}

      <Collapse
        in={isOpen}
        sx={{
          "&.MuiCollapse-hidden": {
            display: "auto",
          },
          ".MuiCollapse-wrapper": {
            width: 0,
          },
        }}
      >
        <div>
          <MessageMemberList isFloater={true}>
            <>
              <div className="membersHeadingContainer">
                <h2 className="membersHeading">Members</h2>

                <img
                  src={RightArrow}
                  className="arrowDown"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
              <div className="membersChatListing">
                <img src={SearchImage} className="searchImage" />
                <SearchInputStyle
                  onChange={handleSearch}
                  value={searchTerm}
                  placeholder="Search here..."
                />

                {!isEmptyArray(conversationList)
                  ? conversationList.map((user, index) => {
                      const currentUser = user?.participants;
                      return (
                        <UserChatStyle
                          key={index}
                          onClick={() => {
                            handleUserChange(user);
                          }}
                        >
                          <div className="leftContainer">
                            <ImageRole
                              src={currentUser?.profile_image}
                              className="profileImage"
                              role={currentUser?.qualification}
                            />
                            {/* <div className='activeUser'></div> */}
                            <div className="nameContainer">
                              <p className="nameText">{currentUser?.name}</p>
                              <span className="roleText">
                                {currentUser?.qualification
                                  ? capitalizeFirstLetter(
                                      currentUser?.qualification
                                    )
                                  : ""}
                              </span>
                            </div>
                          </div>

                          <div className="rightContainer">
                            {unseenMessageUsers[currentUser?._id] ? (
                              <div className="unreadMessage"></div>
                            ) : null}
                          </div>
                        </UserChatStyle>
                      );
                    })
                  : null}
              </div>
            </>
          </MessageMemberList>
        </div>
      </Collapse>
    </BottomFixedStyle>
  );
};

export default MessageFloater;
