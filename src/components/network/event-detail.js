import React, { useContext, useEffect, useState } from 'react'
import {
  EventDetailStyle,
  StyleViewButton
} from '../../style-component/network/event-detail'
import cardBackgroundImage3 from '../../assets/images/cardBackground3.png'
import ImageRole from '../general/image-role'
import PersonImage from '../../assets/images/person.png'
import {
  StyleFeedContainer,
  StylePostButton,
  ThoughtsTextArea
} from '../../style-component/healthcare/healthcare'
import CONSTANT, {
  ACCEPT_IMAGE_TYPE,
  DATE_FORMAT,
  ROUTES
} from '../../utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import ColumbiaImage from '../../assets/images/Columbia_logo.svg'
import Post from '../general/post'
import { dateFormat, isEmptyArray } from '../../utils/funcs'
import GalleryImage from '../../assets/images/gallery.svg'
import useHttp from '../../hooks/use-http'
import Loader from '../general/loader'
import { UserContext } from '../../context/user'

const EventDetail = ({ eventDetail }) => {
  const postApi = useHttp()
  const api = useHttp()

  const { groupId } = useParams()
  const nav = useNavigate()
  const [posts, setPosts] = useState(null)
  const [postValue, setPostValue] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [postPreviewImage, setPostPreviewImage] = useState(null)
  const [participants, setParticipants] = useState(null)
  const { profileDetail } = useContext(UserContext)
  

  const totalMembers =
    eventDetail?.participants && eventDetail?.participants.length

  useEffect(() => {
    if (groupId) getAllPosts()
  }, [])

  useEffect(() => {
    if (
      eventDetail &&
      !isEmptyArray(eventDetail?.participantsInfo) &&
      profileDetail &&
      profileDetail?.id
    ) {
      setParticipants(
        eventDetail?.participantsInfo.filter(
          (row) => row.id !== profileDetail?.id
        )
      )
    }
  }, [eventDetail, profileDetail])

  const handleImageChange = (event) => {
    console.log(event)
    const file = event.target.files[0]
    console.log(file)
    if (file) {
      setPostImage(file)
      setPostPreviewImage(URL.createObjectURL(file))
    }
  }

  const onPostClick = () => {
    if (postValue && groupId) {
      const url = {
        ...CONSTANT.API.uploadPostToGroup,
        endpoint: CONSTANT.API.uploadPostToGroup.endpoint
      }
      const payload = {
        title: eventDetail?.title,
        content: postValue,
        group_id: groupId
      }
      api.sendRequest(url, handleAddPostResponse, payload)
    }
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
        ...CONSTANT.API.uploadPostImageToGroup,
        endpoint: CONSTANT.API.uploadPostImageToGroup.endpoint.replace(
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

  const handlePostsResponse = (resp) => {
    console.log(resp)
    if (resp && resp?.posts) {
      setPosts(resp?.posts)
    }
  }

  const getAllPosts = () => {
    const url = {
      ...CONSTANT.API.getAllPostsByGroupId,
      endpoint: CONSTANT.API.getAllPostsByGroupId.endpoint.replace(
        ':groupId',
        groupId
      )
    }
    api.sendRequest(url, handlePostsResponse)
  }

  return (
    <>
      {api.isLoading ? (
        <Loader height={`calc(80vh)`} />
      ) : (
        <EventDetailStyle>
          <ImageRole
            className='eventImage'
            src={eventDetail?.image}
            defaultImage={cardBackgroundImage3}
          />

          <div className='titleContainer'>
            <h3 className='eventTitle'>{eventDetail?.title}</h3>
            <span className='memberCount'>{totalMembers} Members</span>
          </div>

          {/* <p className='eventDetailText'>{eventDetail?.}</p> */}

          <div className='eventDetailParticipantContainer'>
            <div className='eventDetailPostContainer'>
              <StyleFeedContainer isEventDetailPage={true}>
                <ThoughtsTextArea
                  value={postValue}
                  onChange={(e) => setPostValue(e.target.value)}
                  placeholder='Healthcare Innovation Board'
                />

                <img src={profileDetail?.profile_image} className='postPreviewImage' />

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
                  isEventDetailPage={true}
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

            <div className='eventParticipantsDetail'>
              <h3 className='eventTitle'>Connect with other members</h3>

              <div className='participantsLisContainer'>
                {participants && !isEmptyArray(participants)
                  ? participants.map((participant) => {
                      return (
                        <div className='participantCard' key={participant?.id}>
                          <div className='participantHeader'>
                            <ImageRole
                              src={participant?.profile_image}
                              className='participantImage'
                              role={participant?.qualification}
                            />
                          </div>

                          <h4 className='participantName'>
                            {participant?.name}
                          </h4>
                          {participant?.experience &&
                          !isEmptyArray(participant?.experience) ? (
                            <p className='participantExperience'>
                              {participant?.experience.map((row, index) => {
                                if (index > 0) {
                                  return ` | ${row?.name}`
                                } else {
                                  return `${row?.name}`
                                }
                              })}
                            </p>
                          ) : null}

                          <StyleViewButton
                            onClick={() => {
                              nav(
                                ROUTES.MEMBER.replace(
                                  ':memberId',
                                  participant?.id
                                )
                              )
                            }}
                          >
                            View
                          </StyleViewButton>
                        </div>
                      )
                    })
                  : null}
              </div>
            </div>
          </div>
        </EventDetailStyle>
      )}
    </>
  )
}

export default EventDetail