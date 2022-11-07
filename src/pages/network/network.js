import React, { useState } from 'react'
import VerticalTab from '../../components/network/vertical-tabs'
import {
  StyleConnectButton,
  StyleNetworkContainer
} from '../../style-component/network/network'
import EventImage from '../../assets/images/event.svg'
import HeartImage from '../../assets/images/heart.png'
import UsersImage from '../../assets/images/users.svg'
import PersonImage from '../../assets/images/person.png'
import Header from '../../components/general/header'

const Network = () => {
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
        <Header />
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
              <h2 className='connectionHeading'>My Connections</h2>

              <div className='connectionCardContainer'>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((row, index) => {
                  return (
                    <div className='connectionCard' key={index}>
                      <div className='connectionHeader'>
                        <div className='connectionLeft'>
                          <img src={PersonImage} />

                          <div className='nameContainer'>
                            <h3>Linda Nedell</h3>
                            <span>Parenting | Pregnancy | Career</span>
                          </div>
                        </div>

                        <div>
                          <StyleConnectButton>Connect</StyleConnectButton>
                        </div>
                      </div>

                      <p className='connectionDescription'>
                        Santa Monica State Beach is one of the world's most
                        famous and instantly recognizable destinations. With the
                        Pacific Park amusement park on the historic
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </StyleNetworkContainer>
    </>
  )
}

export default Network
