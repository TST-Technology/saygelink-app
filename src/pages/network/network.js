import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VerticalTab from "../../components/network/vertical-tabs";
import {
  StyleConnectButton,
  StyleJoinButton,
  StyleNetworkContainer
} from "../../style-component/network/network";
import cardBackgroundImage2 from "../../assets/images/cardBackground2.png";
import cardBackgroundImage3 from "../../assets/images/cardBackground3.png";
import EventImage from "../../assets/images/event.svg";
import HeartImage from "../../assets/images/heart.png";
import UsersImage from "../../assets/images/users.svg";
import useHttp from "../../hooks/use-http";
import CONSTANT, { ROUTES, SOCKET_EVENTS } from "../../utils/constants";
import { dateFormat, isEmptyArray, notify } from "../../utils/funcs";
import Loader from "../../components/general/loader";
import DeleteConfirmation from "../../components/delete-confirmation/delete-confirmation";
import ImageRole from "../../components/general/image-role";
import EventDetail from "../../components/network/event-detail";
import { socket } from "../../utils/socket";
import {
  AcceptButtonStyle,
  DeclineButtonStyle,
  ConnectionRequestStyle
} from "../../style-component/connection-request";
import { EventCardMain } from "../../style-component/network/event-detail";
import { Tooltip } from "@mui/material";

export const TAB = {
  CONNECTION_REQUEST: "Connection Requests",
  MY_CONNECTIONS: "My Connections",
  EVENT_GROUPS: "Event Groups",
  INTEREST_GROUPS: "Interest Groups"
};

export const NETWORK_TABS = [
  { label: TAB.CONNECTION_REQUEST, imageUrl: UsersImage, value: "request" },
  { label: TAB.EVENT_GROUPS, imageUrl: EventImage, value: "event" },
  { label: TAB.INTEREST_GROUPS, imageUrl: HeartImage, value: "interest" },
  { label: TAB.MY_CONNECTIONS, imageUrl: UsersImage, value: "" }
];

const Network = ({ activateTabValue, isDetailPage }) => {
  const nav = useNavigate();
  const networkApi = useHttp();
  const [connections, setConnections] = useState(null);
  const [events, setEvents] = useState(null);
  const [interests, setInterests] = useState(null);
  const { groupId } = useParams();
  const [isNotification, setIsNotification] = useState(false);
  const [pendingRequestCount, setPendingRequestCount] = useState(null);

  const [activeTab, setActiveTab] = useState(
    activateTabValue || TAB.EVENT_GROUPS
  );
  const joinApi = useHttp();
  const [joinEventConfirmation, setJoinEventConfirmation] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);
  const [requestDetail, setRequestDetail] = useState(null);

  useEffect(() => {
    getConnection();
    getAllGroups();
    const hash = window.location.hash;
    if (hash === "#interest") {
      setActiveTab(TAB.INTEREST_GROUPS);
    } else if (hash === "#event") {
      setActiveTab(TAB.EVENT_GROUPS);
    }
  }, []);

  useEffect(() => {
    if (groupId) {
      getGroupDetails();
    }
  }, [groupId]);

  const responseHandler = (res) => {
    if (res?.connections) {
      setConnections([...res?.connections]);
    }
  };

  const responseGroupHandler = (res) => {
    if (res?.groups) {
      const event = res.groups.filter((group) => group.groupType === "event");
      const interest = res.groups.filter(
        (group) => group.groupType === "interest"
      );

      setEvents(event);
      setInterests(interest);
    }
  };

  const getConnection = () => {
    networkApi.sendRequest(CONSTANT.API.getMyConnections, responseHandler);
  };

  const getAllGroups = () => {
    networkApi.sendRequest(CONSTANT.API.getAllGroup, responseGroupHandler);
  };

  const handleGroupDetailResponse = (resp) => {
    if (resp && resp?.groupInfo) {
      setEventDetail(resp.groupInfo);
    }
  };

  const getGroupDetails = () => {
    const url = {
      ...CONSTANT.API.getGroupDetails,
      endpoint: CONSTANT.API.getGroupDetails.endpoint.replace(
        ":groupId",
        groupId
      )
    };
    networkApi.sendRequest(url, handleGroupDetailResponse);
  };

  const joinResponseHandler = (resp) => {
    getAllGroups();
    setJoinEventConfirmation(false);
  };

  const handleJoinClick = (event) => {
    setActiveEvent(event);
    setJoinEventConfirmation(true);
  };

  const handleConfirmJoin = () => {
    const groupId = activeEvent?._id;
    if (groupId) {
      const url = {
        ...CONSTANT.API.joinGroup,
        endpoint: CONSTANT.API.joinGroup.endpoint.replace(":groupId", groupId)
      };
      joinApi.sendRequest(url, joinResponseHandler);
    }
  };

  const redirectToMember = (memberId) => {
    if (memberId) {
      nav(ROUTES.MEMBER.replace(":memberId", memberId));
    }
  };

  const handleTabChange = (tab) => {
    if (tab === TAB.EVENT_GROUPS) {
      nav(`${ROUTES.NETWORK_EVENT}`);
    } else if (tab === TAB.INTEREST_GROUPS) {
      nav(`${ROUTES.NETWORK_INTEREST}`);
    } else {
      nav(ROUTES.NETWORK);
    }
    setActiveTab(tab);

    if (tab === "Connection Requests") {
      getConnectionRequests();
    }
  };

  const onEventDetailClick = (groupId) => {
    nav(`${window.location.pathname}/${groupId}`);
  };

  // Connection Request
  const responseConnectionHandler = (resp) => {
    if (resp && resp?.count && resp?.connections) {
      setPendingRequestCount(resp?.count);
      setRequestDetail(resp?.connections);
    }
  };

  const getConnectionRequests = () => {
    networkApi.sendRequest(
      CONSTANT.API.getConnectionRequest,
      responseConnectionHandler
    );
  };

  const handleAcceptDecline = (optionId, connectionId, status) => {
    const payload = {
      connection_id: connectionId,
      option_id: optionId,
      status: "accepted"
    };
    networkApi.sendRequest(
      CONSTANT.API.confirmAvailability,
      responseHandler,
      payload
    );
  };

  return (
    <>
      <StyleNetworkContainer>
        <div className='networkContainer'>
          <div className='leftSideNetwork'>
            <div className='tabsContainer'>
              <VerticalTab
                tabs={NETWORK_TABS}
                activeTab={activeTab}
                onTabClick={(tab) => {
                  handleTabChange(tab);
                }}
              />
            </div>
          </div>

          <div className='rightSideNetwork'>
            <div className='connectionContainer'>
              {networkApi.isLoading ? (
                <Loader height={`calc(80vh)`} />
              ) : (
                <>
                  {!isDetailPage ? (
                    <>
                      {activeTab === TAB.CONNECTION_REQUEST ? (
                        <>
                          <ConnectionRequestStyle style={{ height: "100%" }}>
                            {!isEmptyArray(requestDetail) ? (
                              requestDetail.map((conn, index) => {
                                return (
                                  <>
                                    <div
                                      className='connectionRequest'
                                      key={conn?._id}
                                    >
                                      <div className='connectionNameContainer'>
                                        <ImageRole
                                          className='connectionImage'
                                          src={conn?.user?.profile_image}
                                          role={conn?.user?.qualification}
                                          width='40px'
                                        />

                                        <p className='connectionName'>
                                          {conn?.user?.name}
                                        </p>
                                      </div>
                                      {!isEmptyArray(conn?.options) ? (
                                        <div className='availabilityContainer w-100'>
                                          {conn?.options.map((avail) => {
                                            return (
                                              <div
                                                key={avail?._id}
                                                className='availability'
                                              >
                                                <div>
                                                  <p className='availabilityDay'>
                                                    {avail?.day}
                                                  </p>{" "}
                                                  <span className='availabilityTime'>
                                                    {avail?.time}
                                                  </span>
                                                  <p className='availabilityTimezone'>
                                                    ({conn?.timezone})
                                                  </p>
                                                </div>

                                                <div className='connectionAction'>
                                                  <DeclineButtonStyle
                                                    onClick={() =>
                                                      handleAcceptDecline(
                                                        avail?._id,
                                                        conn?._id,
                                                        "cancelled"
                                                      )
                                                    }
                                                    disabled={
                                                      networkApi.isLoading
                                                    }
                                                  >
                                                    Decline
                                                  </DeclineButtonStyle>
                                                  <AcceptButtonStyle
                                                    onClick={() =>
                                                      handleAcceptDecline(
                                                        avail?._id,
                                                        conn?._id,
                                                        "accepted"
                                                      )
                                                    }
                                                    disabled={
                                                      networkApi.isLoading
                                                    }
                                                  >
                                                    Accept
                                                  </AcceptButtonStyle>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      ) : null}
                                    </div>
                                  </>
                                );
                              })
                            ) : (
                              <p className='mt-2 text-center'>
                                No Connection Requests.
                              </p>
                            )}
                          </ConnectionRequestStyle>
                        </>
                      ) : null}
                      {activeTab === TAB.MY_CONNECTIONS ? (
                        <div>
                          <h2 className='connectionHeading'>My Connections</h2>
                          {!isEmptyArray(connections) ? (
                            <div className='connectionCardContainer'>
                              {!isEmptyArray(connections)
                                ? connections.map((conn, index) => {
                                    return (
                                      <div
                                        className='connectionCard'
                                        key={index}
                                      >
                                        <div className='connectionHeader'>
                                          <div className='connectionLeft'>
                                            <ImageRole
                                              src={conn?.profileImage}
                                              role={conn?.qualification}
                                              className='connectionImage'
                                            />

                                            <div className='nameContainer'>
                                              <h3>{conn?.name}</h3>
                                              <span>{conn?.qualification}</span>
                                            </div>
                                          </div>

                                          <div>
                                            <StyleConnectButton
                                              onClick={() => {
                                                redirectToMember(conn?.id);
                                              }}
                                            >
                                              Connect
                                            </StyleConnectButton>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          ) : (
                            <p className='text-center mt-2'>No Connections</p>
                          )}
                        </div>
                      ) : null}
                      {activeTab === TAB.EVENT_GROUPS ? (
                        <>
                          <h2 className='connectionHeading'></h2>

                          <div className='eventCardContainer'>
                            {!isEmptyArray(events) ? (
                              events.map((event, index) => {
                                return (
                                  <div
                                    className='eventCard'
                                    key={event._id}
                                    onClick={() => {
                                      event.openGroup &&
                                      event.iamPartecipant === false
                                        ? handleJoinClick(event)
                                        : onEventDetailClick(event?._id);
                                    }}
                                  >
                                    <EventCardMain image={event?.image}>
                                      <div className='d-flex flex-column align-items-center p-3 h-100 justify-content-center'>
                                        <Tooltip
                                          title={event?.title}
                                          placement='top'
                                        >
                                          <p className='eventHeading text-center'>
                                            {event?.title}
                                          </p>
                                        </Tooltip>
                                        {event.openGroup &&
                                        event.iamPartecipant === false ? (
                                          <StyleJoinButton
                                            onClick={() => {
                                              handleJoinClick(event);
                                            }}
                                            disabled={joinApi.isLoading}
                                          >
                                            {joinApi.isLoading
                                              ? "Joining"
                                              : "Join"}
                                          </StyleJoinButton>
                                        ) : (
                                          <>
                                            {/* <StyleJoinButton
                                              onClick={() => {
                                                onEventDetailClick(event?._id);
                                              }}
                                            >
                                              Visit
                                            </StyleJoinButton> */}
                                          </>
                                        )}
                                      </div>
                                    </EventCardMain>
                                  </div>
                                );
                              })
                            ) : (
                              <p className='text-center mt-3'>
                                No events available.
                              </p>
                            )}
                          </div>
                        </>
                      ) : null}
                      {activeTab === TAB.INTEREST_GROUPS ? (
                        <>
                          <h2 className='connectionHeading'>Interest Groups</h2>

                          <div className='eventCardContainer'>
                            {!isEmptyArray(interests) ? (
                              interests.map((event, index) => {
                                return (
                                  <div
                                    className='eventCard'
                                    key={event._id}
                                    onClick={() => {
                                      event.openGroup &&
                                      event.iamPartecipant === false
                                        ? handleJoinClick(event)
                                        : onEventDetailClick(event?._id);
                                    }}
                                  >
                                    <EventCardMain image={event?.image}>
                                      <div className='d-flex flex-column align-items-center p-3 h-100 justify-content-center'>
                                        <Tooltip
                                          title={event?.title}
                                          placement='top'
                                        >
                                          <p className='eventHeading text-center'>
                                            {event?.title}
                                          </p>
                                        </Tooltip>
                                        {event.openGroup &&
                                        event.iamPartecipant === false ? (
                                          <StyleJoinButton
                                            onClick={() => {
                                              handleJoinClick(event);
                                            }}
                                            disabled={joinApi.isLoading}
                                          >
                                            {joinApi.isLoading
                                              ? "Joining"
                                              : "Join"}
                                          </StyleJoinButton>
                                        ) : (
                                          <>
                                            {/* <StyleJoinButton
                                            onClick={() => {
                                              onEventDetailClick(event?._id);
                                            }}
                                          >
                                            Visit
                                          </StyleJoinButton> */}
                                          </>
                                        )}
                                      </div>
                                    </EventCardMain>
                                  </div>
                                );
                              })
                            ) : (
                              <p className='text-center mt-3'>
                                No interest available.
                              </p>
                            )}
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <EventDetail eventDetail={eventDetail} />
                  )}
                </>
              )}

              {joinEventConfirmation ? (
                <DeleteConfirmation
                  onCancelButtonClick={() => {
                    setJoinEventConfirmation(false);
                  }}
                  onClose={() => {
                    setJoinEventConfirmation(false);
                  }}
                  onConfirmButtonClick={handleConfirmJoin}
                  message='Aye you sure you want to join?'
                />
              ) : null}
            </div>
          </div>
        </div>
      </StyleNetworkContainer>
    </>
  );
};

export default Network;
