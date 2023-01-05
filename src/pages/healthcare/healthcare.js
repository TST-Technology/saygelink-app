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
import ColumbiaImage from '../../assets/images/Columbia_logo.svg'
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
import CONSTANT, {
  ACCEPT_IMAGE_TYPE,
  DashboardHeaderHeight,
  DATE_FORMAT,
  ROUTES
} from '../../utils/constants'
import { dateFormat, isEmptyArray } from '../../utils/funcs'
import DeleteConfirmation from '../../components/delete-confirmation/delete-confirmation'

const Healthcare = () => {
  const nav = useNavigate()
  const api = useHttp()
  const joinApi = useHttp()
  const postApi = useHttp()
  const { topicId } = useParams()
  const [allMembers, setAllMembers] = useState([])
  const [events, setEvents] = useState(null)
  const [interests, setInterests] = useState(null)
  const [joinEventConfirmation, setJoinEventConfirmation] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)
  const [posts, setPosts] = useState(null)
  const [postValue, setPostValue] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [postPreviewImage, setPostPreviewImage] = useState(null)
  const [topicDetail, setTopicDetail] = useState(null)

  useEffect(() => {
    if (topicId) {
      getAllMembers()
      getAllGroups()
      getAllPosts()
      getTopicDetail()
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
    nav(`${ROUTES.NETWORK_INTEREST}`)
  }

  const redirectToEvent = () => {
    nav(`${ROUTES.NETWORK_EVENT}`)
  }

  const handlePostsResponse = (resp) => {
    console.log(resp)
    if (resp && resp?.posts) {
      setPosts(resp?.posts)
    }
  }

  const getAllPosts = () => {
    const url = {
      ...CONSTANT.API.getAllPostsBySubject,
      endpoint: CONSTANT.API.getAllPostsBySubject.endpoint.replace(
        ':subjectId',
        topicId
      )
    }
    api.sendRequest(url, handlePostsResponse)
  }

  const handleAddPostImageResponse = (resp) => {
    if (resp) {
      getAllPosts()
      setPostValue('')
      setPostPreviewImage(null)
      setPostImage(null)
    }
  }

  const updatePostImageApi = (postId) => {
    if (postImage && postId) {
      const url = {
        ...CONSTANT.API.uploadPostImage,
        endpoint: CONSTANT.API.uploadPostImage.endpoint.replace(
          ':postId',
          postId
        )
      }
      const formData = new FormData()
      formData.append('image', postImage)
      postApi.sendRequest(url, handleAddPostImageResponse, formData)
    }
  }

  const handleAddPostResponse = (resp) => {
    console.log(resp?.post?._id, resp)
    if (resp && resp?.post && resp?.post?._id) {
      if (postImage) {
        updatePostImageApi(resp?.post?._id)
      } else {
        getAllPosts()
        setPostValue('')
      }
    }
  }

  const onPostClick = () => {
    if (postValue && topicId) {
      const url = {
        ...CONSTANT.API.uploadPost,
        endpoint: CONSTANT.API.uploadPost.endpoint
      }
      const payload = {
        title: topicDetail?.name,
        content: postValue,
        subject: topicId
      }
      api.sendRequest(url, handleAddPostResponse, payload)
    }
  }

  const handleImageChange = (event) => {
    console.log(event)
    const file = event.target.files[0]
    console.log(file)
    if (file) {
      setPostImage(file)
      setPostPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleTopicResponse = (resp) => {
    if (resp && resp?.topic);
    setTopicDetail(resp.topic)
  }

  const getTopicDetail = () => {
    const url = {
      ...CONSTANT.API.getTopicDetails,
      endpoint: CONSTANT.API.getTopicDetails.endpoint.replace(
        ':topicId',
        topicId
      )
    }
    api.sendRequest(url, handleTopicResponse)
  }

  return (
    <>
      <HealthcareContainerStyle>
        {api.isLoading ? (
          <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
        ) : (
          <div className='healthCareContainer'>
            <div className='leftContainer'>
              <h3 className='heading'>{topicDetail?.name}</h3>
              <span className='subHeading'>Here are your SAYge Matches! </span>

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

                          <p className='insights'>Zoe Jon's insights</p>

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
                <h3 className='heading'>{topicDetail?.name} board</h3>

                <ThoughtsTextArea
                  value={postValue}
                  onChange={(e) => setPostValue(e.target.value)}
                  placeholder='Share your thoughts...'
                />

                <img src={PersonImage} className='postPreviewImage' />

                <label htmlFor='postImage' className='profileImage'>
                  <input
                    name='postImage'
                    type='file'
                    id='postImage'
                    hidden
                    onChange={handleImageChange}
                    accept={ACCEPT_IMAGE_TYPE}
                  />
                  <span className='photoInput'>
                    <img
                      src={postPreviewImage ? postPreviewImage : GalleryImage}
                    />{' '}
                    Photo
                  </span>
                </label>

                <StylePostButton
                  onClick={onPostClick}
                  disabled={!postValue || postApi.isLoading}
                >
                  {postApi.isLoading ? 'Posting' : 'Post'}
                </StylePostButton>

                <div className='postContainer'>
                  {!isEmptyArray(posts) ? (
                    posts.map((post, index) => {
                      return (
                        <Post
                          key={post._id}
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
                          postImage={post?.image}
                        />
                      )
                    })
                  ) : (
                    <p>No posts available.</p>
                  )}
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
        )}
      </HealthcareContainerStyle>
    </>
  )
}

export default Healthcare
