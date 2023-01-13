import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VerticalTab from '../../components/network/vertical-tabs'
import {
  StyleConnectButton,
  StyleJoinButton,
  StyleNetworkContainer
} from '../../style-component/network/network'
import cardBackgroundImage2 from '../../assets/images/cardBackground2.png'
import cardBackgroundImage3 from '../../assets/images/cardBackground3.png'
import EventImage from '../../assets/images/event.svg'
import HeartImage from '../../assets/images/heart.png'
import UsersImage from '../../assets/images/users.svg'
import useHttp from '../../hooks/use-http'
import CONSTANT, { ROUTES } from '../../utils/constants'
import { isEmptyArray } from '../../utils/funcs'
import Loader from '../../components/general/loader'
import DeleteConfirmation from '../../components/delete-confirmation/delete-confirmation'
import ImageRole from '../../components/general/image-role'
import EventDetail from '../../components/network/event-detail'

export const TAB = {
  CONNECTION_REQUEST: 'Connection Requests',
  MY_CONNECTIONS: 'My Connections',
  EVENT_GROUPS: 'Event Groups',
  INTEREST_GROUPS: 'Interest Groups'
}

export const NETWORK_TABS = [
  { label: TAB.CONNECTION_REQUEST, imageUrl: UsersImage, value: 'request' },
  { label: TAB.MY_CONNECTIONS, imageUrl: UsersImage, value: '' },
  { label: TAB.EVENT_GROUPS, imageUrl: EventImage, value: 'event' },
  { label: TAB.INTEREST_GROUPS, imageUrl: HeartImage, value: 'interest' }
]

const Network = ({ activateTabValue, isDetailPage }) => {
  const nav = useNavigate()
  const networkApi = useHttp()
  const [connections, setConnections] = useState(null)
  const [events, setEvents] = useState(null)
  const [interests, setInterests] = useState(null)
  const { groupId } = useParams()

  const [activeTab, setActiveTab] = useState(
    activateTabValue || TAB.MY_CONNECTIONS
  )
  const joinApi = useHttp()
  const [joinEventConfirmation, setJoinEventConfirmation] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)
  const [eventDetail, setEventDetail] = useState(null)

  useEffect(() => {
    getConnection()
    getAllGroups()
    const hash = window.location.hash
    if (hash === '#interest') {
      setActiveTab(TAB.INTEREST_GROUPS)
    } else if (hash === '#event') {
      setActiveTab(TAB.EVENT_GROUPS)
    }
  }, [])

  useEffect(() => {
    if (groupId) {
      getGroupDetails()
    }
  }, [groupId])

  const responseHandler = (res) => {
    console.log(res)
    if (res?.connections) {
      setConnections([...res?.connections])
    }
  }

  const responseGroupHandler = (res) => {
    if (res?.groups) {
      const event = res.groups.filter((group) => group.groupType === 'event')
      const interest = res.groups.filter(
        (group) => group.groupType === 'interest'
      )
      console.log(event, interest)
      setEvents(event)
      setInterests(interest)
    }
  }

  const getConnection = () => {
    networkApi.sendRequest(CONSTANT.API.getMyConnections, responseHandler)
  }

  const getAllGroups = () => {
    networkApi.sendRequest(CONSTANT.API.getAllGroup, responseGroupHandler)
  }

  const handleGroupDetailResponse = (resp) => {
    if (resp && resp?.groupInfo) {
      setEventDetail(resp.groupInfo)
    }
  }

  const getGroupDetails = () => {
    const url = {
      ...CONSTANT.API.getGroupDetails,
      endpoint: CONSTANT.API.getGroupDetails.endpoint.replace(
        ':groupId',
        groupId
      )
    }
    networkApi.sendRequest(url, handleGroupDetailResponse)
  }

  const joinResponseHandler = (resp) => {
    console.log(resp)
    getAllGroups()
    setJoinEventConfirmation(false)
  }

  const handleJoinClick = (event) => {
    console.log(event)
    setActiveEvent(event)
    setJoinEventConfirmation(true)
  }

  const handleConfirmJoin = () => {
    const groupId = activeEvent?._id
    if (groupId) {
      const url = {
        ...CONSTANT.API.joinGroup,
        endpoint: CONSTANT.API.joinGroup.endpoint.replace(':groupId', groupId)
      }
      joinApi.sendRequest(url, joinResponseHandler)
    }
  }

  const redirectToMember = (memberId) => {
    if (memberId) {
      nav(ROUTES.MEMBER.replace(':memberId', memberId))
    }
  }

  const handleTabChange = (tab) => {
    if (tab === TAB.EVENT_GROUPS) {
      nav(`${ROUTES.NETWORK_EVENT}`)
    } else if (tab === TAB.INTEREST_GROUPS) {
      nav(`${ROUTES.NETWORK_INTEREST}`)
    } else {
      nav(ROUTES.NETWORK)
    }
    setActiveTab(tab)
  }

  const onEventDetailClick = (groupId) => {
    nav(`${window.location.pathname}/${groupId}`)
  }

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
                  handleTabChange(tab)
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
                      {
                        activeTab === TAB.CONNECTION_REQUEST ? (
                          <div>
                            <h2 className='connectionHeading'>
                              Connection Requests
                            </h2>
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
                                              <span>
                                                {conn?.qualification}
                                              </span>
                                            </div>
                                          </div>

                                          <div>
                                            <StyleConnectButton
                                              onClick={() => {
                                                redirectToMember(conn?.id)
                                              }}
                                            >
                                              Connect
                                            </StyleConnectButton>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                  : null}
                              </div>
                            ) : (
                              <p className='text-center mt-2'>No Connections</p>
                            )}
                          </div>
                        ) : null
                      }
                      {
                        activeTab === TAB.MY_CONNECTIONS ? (
                          <div>
                            <h2 className='connectionHeading'>
                              My Connections
                            </h2>
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
                                              <span>
                                                {conn?.qualification}
                                              </span>
                                            </div>
                                          </div>

                                          <div>
                                            <StyleConnectButton
                                              onClick={() => {
                                                redirectToMember(conn?.id)
                                              }}
                                            >
                                              Connect
                                            </StyleConnectButton>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                  : null}
                              </div>
                            ) : (
                              <p className='text-center mt-2'>No Connections</p>
                            )}
                          </div>
                        ) : null
                      }
                      {
                        activeTab === TAB.EVENT_GROUPS ? (
                          <>
                            <h2 className='connectionHeading'>Event Groups</h2>

                            <div className='eventCardContainer'>
                              {!isEmptyArray(events) ? (
                                events.map((event, index) => {
                                  return (
                                    <div className='eventCard' key={event._id}>
                                      <img
                                        className='eventImage'
                                        src={
                                          event?.image
                                            ? event?.image
                                            : cardBackgroundImage2
                                        }
                                      />

                                      <p className='eventHeading'>
                                        {event?.title}
                                      </p>

                                      {event.openGroup &&
                                        event.iamPartecipant === false ? (
                                        <StyleJoinButton
                                          onClick={() => {
                                            handleJoinClick(event)
                                          }}
                                          disabled={joinApi.isLoading}
                                        >
                                          {joinApi.isLoading
                                            ? 'Joining'
                                            : 'Join'}
                                        </StyleJoinButton>
                                      ) : (
                                        <StyleJoinButton
                                          onClick={() => {
                                            onEventDetailClick(event?._id)
                                          }}
                                        >
                                          Visit
                                        </StyleJoinButton>
                                      )}
                                    </div>
                                  )
                                })
                              ) : (
                                <p className='text-center mt-3'>
                                  No events available.
                                </p>
                              )}
                            </div>
                          </>
                        ) : null
                      }
                      {
                        activeTab === TAB.INTEREST_GROUPS ? (
                          <>
                            <h2 className='connectionHeading'>
                              Interest Groups
                            </h2>

                            <div className='eventCardContainer'>
                              {!isEmptyArray(interests) ? (
                                interests.map((event, index) => {
                                  return (
                                    <div className='eventCard' key={event._id}>
                                      <img
                                        className='eventImage'
                                        src={
                                          event?.image
                                            ? event?.image
                                            : cardBackgroundImage3
                                        }
                                      />

                                      <p className='eventHeading'>
                                        {event?.title}
                                      </p>

                                      {event.openGroup &&
                                        event.iamPartecipant === false ? (
                                        <StyleJoinButton
                                          onClick={() => {
                                            handleJoinClick(event)
                                          }}
                                          disabled={joinApi.isLoading}
                                        >
                                          {joinApi.isLoading
                                            ? 'Joining'
                                            : 'Join'}
                                        </StyleJoinButton>
                                      ) : (
                                        <StyleJoinButton
                                          onClick={() => {
                                            onEventDetailClick(event?._id)
                                          }}
                                        >
                                          Visit
                                        </StyleJoinButton>
                                      )}
                                    </div>
                                  )
                                })
                              ) : (
                                <p className='text-center mt-3'>
                                  No interest available.
                                </p>
                              )}
                            </div>
                          </>
                        ) : null
                      }
                    </>
                  ) : (
                    <EventDetail eventDetail={eventDetail} />
                  )}
                </>
              )}

              {joinEventConfirmation ? (
                <DeleteConfirmation
                  onCancelButtonClick={() => {
                    setJoinEventConfirmation(false)
                  }}
                  onClose={() => {
                    setJoinEventConfirmation(false)
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
  )
}

export default Network
