import React, { useEffect, useState } from 'react'
import VerticalTab from '../../components/network/vertical-tabs'
import {
  StyleConnectButton,
  StyleJoinButton,
  StyleNetworkContainer
} from '../../style-component/network/network'
import cardBackgroundImage3 from '../../assets/images/cardBackground3.png'
import EventImage from '../../assets/images/event.svg'
import HeartImage from '../../assets/images/heart.png'
import UsersImage from '../../assets/images/users.svg'
import PersonImage from '../../assets/images/person.png'
import useHttp from '../../hooks/use-http'
import CONSTANT, {
  DashboardHeaderHeight,
  NO_DATA_AVAILABLE
} from '../../utils/constants'
import { isEmptyArray } from '../../utils/funcs'
import Loader from '../../components/general/loader'

const Network = () => {
  const networkApi = useHttp()
  const [connections, setConnections] = useState(null)
  const [events, setEvents] = useState(null)
  const [interests, setInterests] = useState(null)

  useEffect(() => {
    getConnection()
    getAllGroups()
  }, [])

  const responseHandler = (res) => {
    console.log(res)
    if (res?.connections) {
      setConnections([...res?.connections])
    }
  }

  const responseGroupHandler = (res) => {
    console.log(res)
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

  const TAB = {
    MY_CONNECTIONS: 'My Connections',
    EVENT_GROUPS: 'Event Groups',
    INTEREST_GROUPS: 'Interest Groups'
  }
  const [activeTab, setActiveTab] = useState(TAB.MY_CONNECTIONS)
  const TABS = [
    { label: TAB.MY_CONNECTIONS, imageUrl: UsersImage },
    { label: TAB.EVENT_GROUPS, imageUrl: EventImage },
    { label: TAB.INTEREST_GROUPS, imageUrl: HeartImage }
  ]

  return (
    <>
      <StyleNetworkContainer>
        <div className='networkContainer'>
          <div className='leftSideNetwork'>
            <div className='tabsContainer'>
              <VerticalTab
                tabs={TABS}
                activeTab={activeTab}
                onTabClick={(tab) => {
                  setActiveTab(tab)
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
                  {
                    activeTab === TAB.MY_CONNECTIONS ? (
                      <div>
                        <h2 className='connectionHeading'>My Connections</h2>

                        <div className='connectionCardContainer'>
                          {!isEmptyArray(connections)
                            ? connections.map((conn, index) => {
                                return (
                                  <div className='connectionCard' key={index}>
                                    <div className='connectionHeader'>
                                      <div className='connectionLeft'>
                                        <img src={conn?.profileImage} />

                                        <div className='nameContainer'>
                                          <h3>{conn?.name}</h3>
                                          <span>{conn?.qualification}</span>
                                        </div>
                                      </div>

                                      <div>
                                        <StyleConnectButton>
                                          Connect
                                        </StyleConnectButton>
                                      </div>
                                    </div>

                                    {/* <p className='connectionDescription'>
                              Santa Monica State Beach is one of the world's
                              most famous and instantly recognizable
                              destinations. With the Pacific Park amusement park
                              on the historic
                            </p> */}
                                  </div>
                                )
                              })
                            : null}
                        </div>
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
                                        : cardBackgroundImage3
                                    }
                                  />

                                  <p className='eventHeading'>{event?.title}</p>

                                  <StyleJoinButton>Join</StyleJoinButton>
                                </div>
                              )
                            })
                          ) : (
                            <h2>{NO_DATA_AVAILABLE}</h2>
                          )}
                        </div>
                      </>
                    ) : null
                  }
                  {
                    activeTab === TAB.INTEREST_GROUPS ? (
                      <>
                        <h2 className='connectionHeading'>Interest Groups</h2>

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

                                  <p className='eventHeading'>{event?.title}</p>

                                  <StyleJoinButton>Join</StyleJoinButton>
                                </div>
                              )
                            })
                          ) : (
                            <h2>{NO_DATA_AVAILABLE}</h2>
                          )}
                        </div>
                      </>
                    ) : null
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </StyleNetworkContainer>
    </>
  )
}

export default Network
