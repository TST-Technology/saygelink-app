import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  HealthcareContainerStyle,
  StyleConnectButton,
  StyleFeedContainer,
  StyleMembersCard,
  StyleMembersCardContainer,
  StylePostButton,
  ThoughtsTextArea
} from '../../style-component/healthcare/healthcare'
import Loader from '../../components/general/loader'
import ImageRole from '../../components/general/image-role'
import PersonImage from '../../assets/images/person.png'
import FacebookImage from '../../assets/images/profileFacebook.svg'
import LinkedinImage from '../../assets/images/profileLinkedIn.svg'
import InstagramImage from '../../assets/images/profileInstagram.svg'
import TwitterImage from '../../assets/images/profileTwitter.svg'
import LinkImage from '../../assets/images/profileLink.svg'
import GalleryImage from '../../assets/images/gallery.svg'
import ImageCard from '../../components/general/image-card'
import cardBackgroundImage1 from '../../assets/images/cardBackground1.png'
import cardBackgroundImage2 from '../../assets/images/cardBackground2.png'
import Post from '../../components/general/post'
import { useEffect } from 'react'
import useHttp from '../../hooks/use-http'
import CONSTANT, { DashboardHeaderHeight, ROUTES } from '../../utils/constants'

const Healthcare = () => {
  const nav = useNavigate()
  const api = useHttp()
  const joinApi = useHttp()
  const { topicId } = useParams()
  const [allMembers, setAllMembers] = useState([])
  const [events, setEvents] = useState(null)
  const [interests, setInterests] = useState(null)
  const [joinEventConfirmation, setJoinEventConfirmation] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)

  useEffect(() => {
    if (topicId) {
      getAllMembers()
      getAllGroups()
    }
  }, [topicId])

  const getAllMembers = () => {
    const url = {
      ...CONSTANT.API.findSayge,
      endpoint: CONSTANT.API.findSayge.endpoint.replace(':topicId', topicId)
    }
    api.sendRequest(url, handleMembersResponse)
  }

  const handleMembersResponse = (resp) => {
    console.log(resp)
    if (resp && resp?.matchesProfiles) {
      setAllMembers(resp.matchesProfiles)
    }
  }

  const getAvailability = (avail) => {
    return (
      <div className='dayText'>
        {avail.map((row) => {
          return (
            <div>
              <span>
                {row.day} {row.start_time} {row.end_time} {row.timezone}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  const getSocialIcon = (type) => {
    switch (type) {
      case 'Twitter':
        return TwitterImage
      case 'LinkedIn':
        return LinkedinImage
      case 'Facebook':
        return FacebookImage
      case 'Instagram':
        return InstagramImage
      default:
        return LinkImage
    }
  }

  const getSocialMediaIcons = (socialMedia) => {
    if (socialMedia) {
      return (
        <div className='socialProfileContainer'>
          {socialMedia.map((media) => {
            const image = getSocialIcon(media.name)
            return (
              <a target='_blank' href={media.url}>
                <img src={image} className='socialImage' />
              </a>
            )
          })}
        </div>
      )
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

  const getAllGroups = () => {
    joinApi.sendRequest(CONSTANT.API.getAllGroup, responseGroupHandler)
  }

  const handleJoinClick = (event) => {
    console.log(event)
    setActiveEvent(event)
    setJoinEventConfirmation(true)
  }

  const joinResponseHandler = (resp) => {
    console.log(resp)
    getAllGroups()
    setJoinEventConfirmation(false)
  }

  const handleConfirmJoin = () => {
    const groupId = activeEvent?._id
    if (groupId) {
      const url = {
        ...CONSTANT.API.joinGroup,
        endpoint: CONSTANT.API.joinGroup.endpoint.replace(':groupId', groupId)
      }
      api.sendRequest(url, joinResponseHandler)
    }
  }

  const redirectToInterest = () => {
    nav(`${ROUTES.NETWORK}#interest`)
  }

  const redirectToEvent = () => {
    nav(`${ROUTES.NETWORK}#event`)
  }

  return (
    <>
      <HealthcareContainerStyle>
        {api.isLoading ? (
          <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
        ) : (
          <div className='healthCareContainer'>
            <div className='leftContainer'>
              <h3 className='heading'>Healthcare Innovation</h3>
              <span className='subHeading'>Members </span>

              <StyleMembersCardContainer>
                {Array.isArray(allMembers) && allMembers.length > 0
                  ? allMembers.map((member, index) => {
                      return (
                        <StyleMembersCard key={member.id} scale={index}>
                          <div className='headingContainer'>
                            <div>
                              <ImageRole
                                className='memberImage'
                                src={member?.profile_image}
                                role={member?.qualification}
                              />
                            </div>

                            <StyleConnectButton
                              onClick={() =>
                                nav(
                                  ROUTES.MEMBER.replace(':memberId', member?.id)
                                )
                              }
                            >
                              Connect
                            </StyleConnectButton>
                          </div>
                          <h2 className='memberName'>{member.name}</h2>

                          <p className='skills'>
                            Parenting | Pregnancy | Career{' '}
                          </p>

                          <p className='insights'>Zoe Jone's insights</p>

                          <ul>
                            <li>RELATIONSHIP</li>
                            <li>PARENTING</li>
                          </ul>

                          <p className='insights'>Available</p>

                          {getAvailability(member?.availability)}

                          <p className='insights'>Social profiles</p>
                          {getSocialMediaIcons(member?.social_media)}
                        </StyleMembersCard>
                      )
                    })
                  : null}
              </StyleMembersCardContainer>

              <StyleFeedContainer>
                <h3 className='heading'>Work life board</h3>

                <ThoughtsTextArea placeholder='Share your thoughts...' />

                <img src={PersonImage} className='postPreviewImage' />

                <span className='photoInput'>
                  <img src={GalleryImage} /> Photo
                </span>

                <StylePostButton>Post</StylePostButton>

                <div className='postContainer'>
                  {[0, 1, 2, 3].map((row, index) => {
                    return (
                      <>
                        <Post
                          name='Rebecca Shoenfield'
                          time={'Just Now'}
                          description={
                            "Don't miss out on the opportunitiy to network with alumni at our annual HPM event! Register here."
                          }
                          image={PersonImage}
                        />
                      </>
                    )
                  })}
                </div>
              </StyleFeedContainer>
            </div>
            <div className='rightContainer'>
              <h3 className='heading'>My Groups</h3>

              <div className='rightSideCard'>
                {events &&
                  events.slice(0, 2).map((event, index) => {
                    return (
                      <ImageCard
                        key={event._id}
                        backgroundImage={
                          event?.image ? event?.image : cardBackgroundImage2
                        }
                        buttonText={
                          event.openGroup && event.iamPartecipant === false
                            ? 'Join'
                            : ''
                        }
                        cardText={event?.title}
                        onButtonClick={() => {
                          handleJoinClick(event)
                        }}
                        headingTitle={index === 0 ? 'Event groups' : ''}
                        headingButton={index === 0 ? 'View all' : null}
                        onHeadingButtonClick={() => {
                          redirectToEvent()
                        }}
                      />
                    )
                  })}
              </div>

              <div className='rightSideCard'>
                {interests &&
                  interests.slice(0, 2).map((event, index) => {
                    return (
                      <ImageCard
                        key={event._id}
                        backgroundImage={
                          event?.image ? event?.image : cardBackgroundImage2
                        }
                        buttonText={
                          event.openGroup && event.iamPartecipant === false
                            ? 'Join'
                            : ''
                        }
                        cardText={event?.title}
                        onButtonClick={() => {
                          handleJoinClick(event)
                        }}
                        headingTitle={index === 0 ? 'Interest groups' : ''}
                        headingButton={index === 0 ? 'View all' : null}
                        onHeadingButtonClick={() => {
                          redirectToInterest()
                        }}
                      />
                    )
                  })}
              </div>
            </div>
          </div>
        )}
      </HealthcareContainerStyle>
    </>
  )
}

export default Healthcare
