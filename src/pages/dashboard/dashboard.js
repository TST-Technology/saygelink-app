import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BackgroundLogoImage from '../../assets/images/saygeLinkBgLogo.png'
import {
  BottomFixedStyle,
  HomeContainerStyle
} from '../../style-component/dashboard/dashboard'
import cardBackgroundImage2 from '../../assets/images/cardBackground2.png'
import cardBackgroundImage3 from '../../assets/images/cardBackground3.png'
import cardBackgroundImage4 from '../../assets/images/cardBackground4.png'
import PersonImage from '../../assets/images/person.png'
import RightArrow from '../../assets/images/RightArrow.svg'
import ImageCard from '../../components/general/image-card'
import { StyleCategoryCard } from '../../style-component/createAccount/experiences'
import Post from '../../components/general/post'
import CustomCalender from '../../components/custom-calender/custom-calender'
import CONSTANT, {
  DashboardHeaderHeight,
  DATE_FORMAT,
  NO_DATA_AVAILABLE
} from '../../utils/constants'
import { Services } from '../../api/service'
import ColumbiaImage from '../../assets/images/columbia_logo.png'
import { dateFormat, isEmptyArray } from '../../utils/funcs'
import Loader from '../../components/general/loader'

const Dashboard = () => {
  const [categories, setCategories] = useState(null)
  const [posts, setPosts] = useState(null)
  const [events, setEvents] = useState(null)
  const [interests, setInterests] = useState(null)
  const [value, setValue] = useState(new Date())
  const [connections, setConnections] = useState(null)
  const [activeConnections, setActiveConnection] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  useEffect(() => {
    getAllData()
  }, [])

  useEffect(() => {
    if (!isEmptyArray(connections)) {
      findActiveConnection(connections)
    }
  }, [value, connections])

  const API_REQUESTS = [
    CONSTANT.API.getCategories.endpoint,
    CONSTANT.API.getAllPost.endpoint,
    CONSTANT.API.getAllGroup.endpoint,
    CONSTANT.API.getAllConnections.endpoint
  ]

  const getAllData = () => {
    setIsLoading(true)
    axios.all(API_REQUESTS.map((promise) => Services.get(promise))).then(
      axios.spread((categoryResp, postResp, groupResp, connectionResp) => {
        setIsLoading(false)
        setCategories(categoryResp.data.categories)
        setPosts(postResp.data.posts)
        const event = groupResp.data.groups.filter(
          (group) => group.groupType === 'event'
        )
        const interest = groupResp.data.groups.filter(
          (group) => group.groupType === 'interest'
        )
        setEvents(event)
        setInterests(interest)
        setConnections(connectionResp.data.connections)
      })
    )
  }

  const findActiveConnection = (connections) => {
    const newConn = connections.filter((conn) => {
      if (conn.connect_on.day) {
        const selectedDate = dateFormat(value, DATE_FORMAT.FORMAT_2)
        console.log(selectedDate, conn.connect_on.day)
        return selectedDate === conn.connect_on.day
      }
    })
    console.log(newConn)
    setActiveConnection(newConn)
  }

  return (
    <>
      {isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
        <HomeContainerStyle>
          <div className='homeBackgroundContainer'>
            <div className='homeBannerTextContainer'>
              <h2 className='blackText'>
                Start a <br /> Conversation On
              </h2>
              <img className='bgLogo' src={BackgroundLogoImage} />
            </div>
          </div>

          <div className='homeContentContainer'>
            <div className='homeContentLeftContainer'>
              <img src={cardBackgroundImage4} />
              {!isEmptyArray(events) ? (
                <>
                  <div className='cardHeading'>
                    <p className=''>Events</p>
                    <span className=''>View all</span>
                  </div>
                  {events &&
                    events.map((event) => {
                      return (
                        <ImageCard
                          key={event._id}
                          backgroundImage={
                            event?.image ? event?.image : cardBackgroundImage2
                          }
                          buttonText='Join'
                          cardText={event?.title}
                          showBorder={false}
                        />
                      )
                    })}
                </>
              ) : (
                <h4>{NO_DATA_AVAILABLE}</h4>
              )}

              {!isEmptyArray(interests) ? (
                <>
                  <div className='cardHeading'>
                    <p className=''>Interest</p>
                    <span className=''>View all</span>
                  </div>
                  {interests.map((interest) => {
                    return (
                      <ImageCard
                        key={interest._id}
                        backgroundImage={
                          interest?.image
                            ? interest?.image
                            : cardBackgroundImage3
                        }
                        buttonText='Join'
                        cardText={interest?.title}
                        showBorder={false}
                      />
                    )
                  })}
                </>
              ) : (
                <h4>{NO_DATA_AVAILABLE}</h4>
              )}
            </div>
            <div className='homeContentCenterContainer'>
              <div className='categoryContainer'>
                {!isEmptyArray(categories) ? (
                  categories.map((category, index) => {
                    return (
                      <StyleCategoryCard key={index}>
                        <div className='imageContainer'>
                          <img src={category?.image} />
                        </div>
                        <div className='labelContainer'>
                          <span className='label'>{category?.name}</span>
                        </div>
                      </StyleCategoryCard>
                    )
                  })
                ) : (
                  <h4>{NO_DATA_AVAILABLE}</h4>
                )}
              </div>

              <div className='postContainer'>
                <h2 className='postTitle'>HPM Happenings</h2>
                {!isEmptyArray(posts) ? (
                  posts.map((post, index) => {
                    return (
                      <>
                        <Post
                          name={post?.name}
                          time={
                            post?.createdAt
                              ? dateFormat(
                                  post?.createdAt,
                                  DATE_FORMAT.FORMAT_1
                                )
                              : ''
                          }
                          description={post?.content}
                          image={ColumbiaImage}
                        />
                      </>
                    )
                  })
                ) : (
                  <h4>{NO_DATA_AVAILABLE}</h4>
                )}
              </div>
            </div>
            <div className='homeContentRightContainer'>
              <h2 className='calenderTitle'>Calender</h2>
              <CustomCalender onChange={setValue} value={value} />

              {!isEmptyArray(activeConnections) ? (
                <div className='connectionContainer'>
                  <div className='cardHeading'>
                    <p className=''>Upcoming Meetings</p>
                    <span className=''>View all</span>
                  </div>
                  <></>
                  {activeConnections &&
                    activeConnections.map((conn) => {
                      return (
                        <div key={conn._id}>
                          <div className='connectionItem'>
                            <img
                              src={conn?.sharer?.profile_image}
                              className='connectionImage'
                            />

                            <div className='connectionDetail'>
                              <p className='connectionName'>
                                {conn?.sharer?.name}
                              </p>
                              <span className='connectionTime'>
                                {conn?.connect_on?.day
                                  ? dateFormat(
                                      conn?.connect_on?.day,
                                      DATE_FORMAT.FORMAT_1
                                    )
                                  : ''}
                              </span>
                            </div>
                          </div>
                          <a href={conn?.zoom_link} className='connectionLink'>
                            {conn?.zoom_link}
                          </a>
                        </div>
                      )
                    })}
                </div>
              ) : null}
            </div>
          </div>

          <BottomFixedStyle>
            <div className='nameContainer'>
              <img src={PersonImage} />
              <p>Rebecca Shoenfield</p>
            </div>

            <div className='buttonContainer'>
              <div className='count'>1</div>
              <img src={RightArrow} className='arrow' />
            </div>
          </BottomFixedStyle>
        </HomeContainerStyle>
      )}
    </>
  )
}

export default Dashboard
