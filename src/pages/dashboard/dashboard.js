import React, { useEffect, useState } from "react";
import axios from "axios";
import BackgroundLogoImage from "../../assets/images/saygeLinkBgLogo.png";
import {
  BottomFixedStyle,
  FindSaygeButtonStyle,
  HomeContainerStyle,
} from "../../style-component/dashboard/dashboard";
import cardBackgroundImage2 from "../../assets/images/cardBackground2.png";
import cardBackgroundImage3 from "../../assets/images/cardBackground3.png";
import beASaygeBackground from "../../assets/images/HomeCardBackground.svg";
import ImageCard from "../../components/general/image-card";
import { StyleCategoryCard } from "../../style-component/createAccount/experiences";
import Post from "../../components/general/post";
import CustomCalender from "../../components/custom-calender/custom-calender";
import CONSTANT, {
  DashboardHeaderHeight,
  DATE_FORMAT,
  NO_DATA_AVAILABLE,
  ROUTES,
  scheduleMeetingStyle,
} from "../../utils/constants";
import { Services } from "../../api/service";
import ColumbiaImage from "../../assets/images/profileIcon.svg";
import SearchImage from "../../assets/images/search-white.svg";
import { dateFormat, isEmptyArray } from "../../utils/funcs";
import Loader from "../../components/general/loader";
import { CalenderEventButtonStyle } from "../../style-component/calender/calender";
import RescheduleImage from "../../assets/images/reschedule.svg";
import SendDarkImage from "../../assets/images/send-dark.svg";
import { Menu } from "@mui/material";
import ScheduleMeeting from "../../components/schedule-meeting/schedule-meeting";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import DeleteConfirmation from "../../components/delete-confirmation/delete-confirmation";
import MessageFloater from "../../components/general/message-floater";
import {
  ImageCardStyle,
  ImageCardStyleNew,
} from "../../style-component/image-card/image-card";
import { border } from "@mui/system";

const Dashboard = () => {
  const [categories, setCategories] = useState(null);
  const [posts, setPosts] = useState(null);
  const [events, setEvents] = useState(null);
  const [interests, setInterests] = useState(null);
  const [value, setValue] = useState(new Date());
  const [connections, setConnections] = useState([]);
  const [activeConnections, setActiveConnection] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const joinApi = useHttp();
  const [joinEventConfirmation, setJoinEventConfirmation] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (!isEmptyArray(connections)) {
      findActiveConnection(connections);
    }
  }, [value, connections]);

  const API_REQUESTS = [
    CONSTANT.API.getCategories.endpoint,
    CONSTANT.API.getAllPost.endpoint,
    CONSTANT.API.getAllGroup.endpoint,
    CONSTANT.API.getAllConnections.endpoint,
  ];

  const getAllData = () => {
    setIsLoading(true);
    axios.all(API_REQUESTS.map((promise) => Services.get(promise))).then(
      axios.spread((categoryResp, postResp, groupResp, connectionResp) => {
        setIsLoading(false);
        setCategories(categoryResp.data.categories);
        setPosts(postResp.data.posts);
        const event = groupResp.data.groups.filter(
          (group) => group.groupType === "event"
        );
        const interest = groupResp.data.groups.filter(
          (group) => group.groupType === "interest"
        );
        setEvents(event);
        setInterests(interest);
        setConnections(connectionResp.data.connections);
      })
    );
  };

  const findActiveConnection = (connections) => {
    const newConn = connections.filter((conn) => {
      if (conn.connect_on.day) {
        const selectedDate = dateFormat(value, DATE_FORMAT.FORMAT_2);
        console.log(selectedDate, conn.connect_on.day);
        return selectedDate === conn.connect_on.day;
      }
    });
    console.log(newConn);
    setActiveConnection(newConn);
  };

  const handleClick = (event, connection) => {
    setAnchorEl(event.currentTarget);
    console.log(connection);
    setSelectedConnection({ ...connection });
  };
  const handleClose = (apiCall) => {
    setAnchorEl(null);
    if (apiCall === true) {
      getAllData();
    }
  };

  const redirectToInterest = () => {
    navigate(`${ROUTES.NETWORK_INTEREST}`);
  };

  const redirectToEvent = () => {
    navigate(`${ROUTES.NETWORK_EVENT}`);
  };

  const handleFindSayge = () => {
    navigate(ROUTES.CATEGORY_FIND);
  };

  const redirectToCategory = (categoryId) => {
    navigate(ROUTES.CATEGORY_ACTIVE.replace(":categoryId", categoryId));
  };

  const handleJoinClick = (event) => {
    console.log(event);
    setActiveEvent(event);
    setJoinEventConfirmation(true);
  };

  const joinResponseHandler = (resp) => {
    console.log(resp);
    getAllData();
    setJoinEventConfirmation(false);
  };

  const handleConfirmJoin = () => {
    const groupId = activeEvent?._id;
    if (groupId) {
      const url = {
        ...CONSTANT.API.joinGroup,
        endpoint: CONSTANT.API.joinGroup.endpoint.replace(":groupId", groupId),
      };
      joinApi.sendRequest(url, joinResponseHandler);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
        <HomeContainerStyle>
          <div className="homeBackgroundContainer">
            <div className="homeBannerTextContainer">
              <h2 className="blackText">
                Start <br /> connecting On
              </h2>
              <img className="bgLogo" src={BackgroundLogoImage} />
            </div>

            <div className="homeBannerButtonContainer">
              <p>Someone has the insight you need today.</p>

              <FindSaygeButtonStyle onClick={handleFindSayge}>
                <img src={SearchImage} />
                Start Here
              </FindSaygeButtonStyle>
            </div>
          </div>
          <div className="homeContentContainer">
            <div className="homeContentLeftContainer">
              <ImageCardStyleNew
                bgImage={beASaygeBackground}
                showBorder={false}
              >
                <div className="cardBody">
                  <div className="cardImage" style={{ height: "180px" }}>
                    <p className="cardImageText text-dark">
                      Everyone has a story.
                      <br /> What's your story?
                    </p>
                    <a
                      onClick={() => {
                        navigate(ROUTES.CATEGORY);
                      }}
                    >
                      Be a SAYge
                    </a>
                  </div>
                </div>
              </ImageCardStyleNew>

              {!isEmptyArray(events) ? (
                <div className="eventsContainer">
                  <div className="cardHeading">
                    <p className="">Groups</p>
                    <span className="" onClick={() => redirectToEvent()}>
                      View all
                    </span>
                  </div>
                  {events &&
                    events.slice(0, 2).map((event) => {
                      return (
                        <ImageCard
                          key={event._id}
                          mainId={event._id}
                          field="event"
                          backgroundImage={
                            event?.image ? event?.image : cardBackgroundImage2
                          }
                          participant={event.iamPartecipant}
                          buttonText={
                            event.openGroup && event.iamPartecipant === false
                              ? "Join"
                              : null
                          }
                          cardText={event?.title}
                          showBorder={false}
                          onButtonClick={() => {
                            handleJoinClick(event);
                          }}
                        />
                      );
                    })}
                </div>
              ) : (
                <h4>{NO_DATA_AVAILABLE}</h4>
              )}

              {!isEmptyArray(interests) ? (
                <>
                  <div className="cardHeading">
                    <p className="">Interest</p>
                    <span className="" onClick={() => redirectToInterest()}>
                      View all
                    </span>
                  </div>
                  {interests.slice(0, 2).map((interest) => {
                    return (
                      <ImageCard
                        key={interest._id}
                        field="interest"
                        mainId={interest._id}
                        backgroundImage={
                          interest?.image
                            ? interest?.image
                            : cardBackgroundImage3
                        }
                        participant={interest.iamPartecipant}
                        buttonText={
                          interest.openGroup &&
                          interest.iamPartecipant === false
                            ? "Join"
                            : null
                        }
                        cardText={interest?.title}
                        showBorder={false}
                        onButtonClick={() => {
                          handleJoinClick(interest);
                        }}
                      />
                    );
                  })}
                </>
              ) : (
                <h4>{NO_DATA_AVAILABLE}</h4>
              )}
            </div>
            <div className="homeContentCenterContainer">
              <div className="categoryContainer">
                {!isEmptyArray(categories) ? (
                  categories.map((category, index) => {
                    console.log(category);
                    return (
                      <StyleCategoryCard
                        key={index}
                        onClick={() => {
                          redirectToCategory(category?._id);
                        }}
                      >
                        <div className="imageContainer">
                          <img src={category?.image} />
                        </div>
                        <div className="labelContainer">
                          <span className="label">{category?.name}</span>
                        </div>
                      </StyleCategoryCard>
                    );
                  })
                ) : (
                  <h4>{NO_DATA_AVAILABLE}</h4>
                )}
              </div>

              <div className="postContainer">
                <h2 className="postTitle">HPM Happenings</h2>
                {!isEmptyArray(posts) ? (
                  posts.map((post, index) => {
                    return (
                      <Post
                        key={post._id}
                        name={post?.name}
                        time={
                          post?.createdAt
                            ? dateFormat(post?.createdAt, DATE_FORMAT.FORMAT_1)
                            : ""
                        }
                        description={post?.content}
                        image={ColumbiaImage}
                        postImage={post?.image}
                      />
                    );
                  })
                ) : (
                  <p>No posts available.</p>
                )}
              </div>
            </div>
            <div className="homeContentRightContainer">
              <h2 className="calenderTitle">Calender</h2>
              <CustomCalender
                onChange={setValue}
                value={value}
                connections={connections}
              />

              {!isEmptyArray(activeConnections) ? (
                <div className="connectionContainer">
                  <div className="cardHeading">
                    <p className="">Upcoming Meetings</p>
                    <span
                      className=""
                      onClick={() => navigate(`${ROUTES.CALENDER}`)}
                    >
                      View all
                    </span>
                  </div>
                  <></>
                  {activeConnections &&
                    activeConnections.map((conn) => {
                      return (
                        <div
                          key={conn._id}
                          style={{
                            background: "#fff",
                            padding: "12px 0px 17px 11px",
                            borderRadius: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <div className="connectionItem">
                            <img
                              src={conn?.sharer?.profile_image}
                              className="connectionImage"
                            />

                            <div className="connectionDetail">
                              <p className="connectionName">
                                {conn?.sharer?.name}
                              </p>
                              <span className="connectionTime">
                                {conn?.connect_on?.day
                                  ? dateFormat(
                                      conn?.connect_on?.day,
                                      DATE_FORMAT.FORMAT_1
                                    )
                                  : ""}
                              </span>
                            </div>
                          </div>
                          <div className="meetingButtonContainer">
                            <a
                              className="meetingButton"
                              onClick={(e) => handleClick(e, conn)}
                              size="small"
                              sx={{ ml: 2 }}
                              aria-controls={open ? "account-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                            >
                              <img src={RescheduleImage} />
                              Re-schedule
                            </a>
                            <a
                              target="_blank"
                              href={conn?.zoom_link}
                              className="meetingButton"
                            >
                              <img src={SendDarkImage} />
                              Join
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="mt-3 text-center">No schedule found</p>
              )}
            </div>
          </div>
          <MessageFloater />
          {open ? (
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={() => handleClose(false)}
              PaperProps={{
                elevation: 0,
                sx: { ...scheduleMeetingStyle, "&:before": {} },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <ScheduleMeeting
                connectionId={selectedConnection?._id}
                email={selectedConnection?.sharer?.email}
                optionId={selectedConnection?.connect_on?._id}
                onClose={handleClose}
              />
            </Menu>
          ) : null}

          {joinEventConfirmation ? (
            <DeleteConfirmation
              onCancelButtonClick={() => {
                setJoinEventConfirmation(false);
              }}
              onClose={() => {
                setJoinEventConfirmation(false);
              }}
              onConfirmButtonClick={handleConfirmJoin}
              message="Aye you sure you want to join?"
            />
          ) : null}
        </HomeContainerStyle>
      )}
    </>
  );
};

export default Dashboard;
