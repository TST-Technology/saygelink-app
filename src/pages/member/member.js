import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImageRole from '../../components/general/image-role'
import Loader from '../../components/general/loader'
import useHttp from '../../hooks/use-http'
import VerifiedImage from '../../assets/images/verified.svg'
import FacebookImage from '../../assets/images/profileFacebook.svg'
import LinkedinImage from '../../assets/images/profileLinkedIn.svg'
import InstagramImage from '../../assets/images/profileInstagram.svg'
import TwitterImage from '../../assets/images/profileTwitter.svg'
import LinkImage from '../../assets/images/profileLink.svg'
import FileImage from '../../assets/images/file.svg'
import UpImage from '../../assets/images/upArrow.svg'
import {
  MemberContainerStyle,
  ScheduleCallButtonStyle,
  SendMessageButtonStyle,
  StyleCategoryCard,
  StyleChatRequestInput
} from '../../style-component/member/member'
import CONSTANT, {
  DashboardHeaderHeight,
  ROUTES,
  scheduleMeetingStyle,
  visitedMember
} from '../../utils/constants'
import ScheduleMeeting from '../../components/schedule-meeting/schedule-meeting'
import { Menu } from '@mui/material'
import { UserContext } from '../../context/user'
import { getEmail, isEmptyArray } from '../../utils/funcs'

const Member = ({ isEdit }) => {
  console.log(isEdit)
  const nav = useNavigate()
  const api = useHttp()
  const messageApi = useHttp()
  const { memberId } = useParams()
  const [profileDetail, setProfileDetail] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const {
    setUser,
    user,
    setProfileDetail: setProfile,
    profileDetail: detail
  } = useContext(UserContext)
  const [selectedWeekday, setSelectedWeekDay] = useState('Sun')

  // Edit
  const profileApi = useHttp()
  const email = getEmail()
  const [maximumRequests, setMaximumRequests] = useState(null)
  const [maximinRequestsChanged, setMaximinRequestsChanged] = useState(false)

  useEffect(() => {
    if (email) {
      getProfile()
    }
  }, [])

  useEffect(() => {
    if (!isEdit && memberId) {
      getMemberDetail()
    }
  }, [memberId])

  const handleMemberResponse = (resp) => {
    if (resp && resp?.userInfo) {
      setProfileDetail(resp?.userInfo)
    }
  }

  const getMemberDetail = () => {
    if (memberId) {
      const url = {
        ...CONSTANT.API.userDetailById,
        endpoint: CONSTANT.API.userDetailById.endpoint.replace(
          'userId',
          memberId
        )
      }
      api.sendRequest(url, handleMemberResponse)
    }
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
              <div className='socialMediaLink'>
                <a target='_blank' href={media.url}>
                  <img src={image} className='socialImage' />
                </a>
              </div>
            )
          })}
        </div>
      )
    }
  }

  const handleScheduleCall = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (e) => {
    setAnchorEl(null)
  }

  const prepareNewMember = (conversationId) => {
    const newMember = {
      createdAt: new Date(),
      participants: {
        name: profileDetail?.name,
        email: profileDetail?.email,
        profile_image: profileDetail?.profile_image,
        qualification: profileDetail?.qualification,
        qualification_year: profileDetail?.qualification_year,
        unseen_messages: 'N/A',
        _id: profileDetail?.id
      },
      _id: conversationId
    }
    return newMember
  }

  const handleSendMessageResponse = (resp) => {
    if (
      resp &&
      resp?.conversation &&
      resp?.conversation[0] &&
      resp?.conversation[0]._id
    ) {
      const conversationId = resp?.conversation[0]._id
      visitedMember.detail = prepareNewMember(conversationId)
      nav(ROUTES.MESSAGE_TO.replace(':conversationId', conversationId))
    } else if (resp && resp?.conversation && resp?.conversation?._id) {
      const conversationId = resp?.conversation?._id
      visitedMember.detail = prepareNewMember(conversationId)
      nav(ROUTES.MESSAGE_TO.replace(':conversationId', conversationId))
    }
  }

  const onSendMessage = (memberId) => {
    const payload = {
      participants: [memberId, detail?.id]
    }
    messageApi.sendRequest(
      CONSTANT.API.getOrCreateConversation,
      handleSendMessageResponse,
      payload
    )
  }

  const currentWeekDay = !isEmptyArray(profileDetail?.availability)
    ? profileDetail?.availability.filter((row) => row?.day === selectedWeekday)
    : []

  // Edit Api Calls
  const responseHandler = (res) => {
    if (res?.userInfo) {
      setProfile({ ...res?.userInfo })
      setProfileDetail({ ...res?.userInfo })
      setMaximumRequests(res?.userInfo?.max_chat_requests)
    }
  }

  const getProfile = () => {
    const url = {
      ...CONSTANT.API.getProfileDetail,
      endpoint: CONSTANT.API.getProfileDetail.endpoint.replace(':email', email)
    }
    profileApi.sendRequest(url, responseHandler)
  }

  const onChatRequestChange = (flag) => {
    setMaximinRequestsChanged(true)
    if (flag === '+') {
      setMaximumRequests((prevValue) => prevValue + 1)
    } else if (flag === '-') {
      setMaximumRequests((prevValue) => prevValue - 1)
    } else {
      setMaximumRequests(flag.target.value)
    }
  }

  return (
    <>
      {api.isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
        <MemberContainerStyle>
          <div className='profileTopSection'>
            <div className='profileTopLeftSection'>
              <div className='profileImageContainer'>
                <ImageRole
                  className='profileMemberImage'
                  src={profileDetail?.profile_image}
                  alt=''
                />
              </div>

              <div className='profileLeftDetailContainer'>
                <div className='nameRoleContainer'>
                  <h3>{profileDetail?.name}</h3>
                  <span>{profileDetail?.qualification}</span>
                </div>
                <div className='otherFieldsContainer'>
                  <div className='otherField'>
                    <p className='value'>Post</p>
                    <b className='title'>{profileDetail?.num_posts}</b>
                  </div>

                  <div className='otherField'>
                    <p className='value'>Meets</p>
                    <b className='title'>{profileDetail?.num_meets}</b>
                  </div>
                  <div className='otherField'>
                    <p className='value'>Verified</p>
                    <img src={VerifiedImage} />
                  </div>
                </div>
              </div>
            </div>
            <div className='profileTopRightSection'>
              <div className='profileButtonContainer'>
                <ScheduleCallButtonStyle onClick={handleScheduleCall}>
                  Schedule a Call
                </ScheduleCallButtonStyle>
                <SendMessageButtonStyle
                  onClick={() => onSendMessage(profileDetail?.id)}
                  disabled={messageApi.isLoading}
                >
                  {messageApi.isLoading ? 'Loading' : 'Send Message'}
                </SendMessageButtonStyle>
              </div>
            </div>
          </div>
          <div className='profileBottomSection'>
            <div>
              <div className='section'>
                <h2 className='memberSectionHeading'>About Me</h2>

                <p className='bioDetail'>{profileDetail?.about}</p>
              </div>

              <div className='section'>
                <h2 className='memberSectionHeading'>Insigths</h2>

                <div className='insightContainer'>
                  {profileDetail?.experience
                    ? profileDetail?.experience.map((exp) => {
                        return (
                          <StyleCategoryCard key={exp?.category_id}>
                            <div className='imageContainer'>
                              <img src={''} className='categoryImage' />
                            </div>
                            <div className='labelContainer'>
                              <span className='label'>{exp?.name}</span>
                            </div>
                          </StyleCategoryCard>
                        )
                      })
                    : null}
                </div>
              </div>
            </div>
            <div>
              <div className='section'>
                <h2 className='memberSectionHeading'>General Availability</h2>
                <div className='weekDayContainer'>
                  {CONSTANT.WEEK_DIGIT.map((day, index) => {
                    return (
                      <div
                        className={`weekDay ${
                          profileDetail?.availability
                            .map((avail) => avail.day)
                            .includes(day)
                            ? 'addedWeekDay'
                            : ''
                        } ${selectedWeekday === day ? 'selectedWeekDay' : ''}`}
                        key={index}
                        onClick={() => {
                          setSelectedWeekDay(day)
                        }}
                      >
                        <span>{day.substring(0, 2)}</span>
                      </div>
                    )
                  })}
                </div>

                {!isEmptyArray(currentWeekDay) ? (
                  <div className='timingContainer'>
                    {currentWeekDay
                      ? currentWeekDay.map((avail, index) => {
                          return (
                            <div key={avail?._id} className='timing'>
                              <span>{`${avail?.start_time} - ${avail?.end_time}`}</span>
                            </div>
                          )
                        })
                      : null}
                  </div>
                ) : null}
              </div>

              {isEdit ? (
                <div className='section'>
                  <h2 className='memberSectionHeading'>
                    Maximum chat requests
                  </h2>

                  <p className='tooltipSubHeading'>
                    <b>Tip:</b> Feel free to select a limit for the number of
                    chat requests you’d like per month.
                  </p>
                  <div className='chatRequestsSection'>
                    <div className='chatRequestsContainer'>
                      <StyleChatRequestInput
                        type={'number'}
                        value={maximumRequests}
                        onChange={(e) => {
                          onChatRequestChange(e)
                        }}
                      ></StyleChatRequestInput>
                      <div className='chatRequestActionContainer'>
                        <a
                          className='increment button'
                          onClick={() => {
                            onChatRequestChange('+')
                          }}
                        >
                          <img className='upArrow' src={UpImage} />
                        </a>

                        <a
                          className='decrement button'
                          onClick={() => {
                            onChatRequestChange('-')
                          }}
                        >
                          <img className='downArrow' src={UpImage} />
                        </a>
                      </div>
                    </div>
                    <span>chat requests per month.</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div>
              {profileDetail?.file ? (
                <div className='section'>
                  <h2 className='memberSectionHeading'>Attachments</h2>

                  <a className='fileContainer' href={profileDetail?.file}>
                    <div>
                      <img src={FileImage} />
                    </div>
                    <span>Attachments.pdf</span>
                  </a>
                </div>
              ) : null}

              <h2 className='memberSectionHeading'>Social Media</h2>

              {getSocialMediaIcons(profileDetail?.social_media)}
            </div>
          </div>
          {/* <div className='leftSideMemberSection'>
            <div className='profileDetail'>
              <div className='nameContainer'>
                <div>
                  <ImageRole
                    src={profileDetail?.profile_image}
                    alt=''
                    className='profileMemberImage'
                  />
                </div>

                <div className='nameRoleContainer'>
                  <h3>{profileDetail?.name}</h3>
                  <span>{profileDetail?.qualification}</span>
                </div>
              </div>

              <div className='otherFieldsContainer'>
                <div className='otherField'>
                  <b className='title'>{profileDetail?.num_posts}</b>
                  <p className='value'>Post</p>
                </div>

                <div className='otherField'>
                  <b className='title'>{profileDetail?.num_meets}</b>
                  <p className='value'>Meets</p>
                </div>
                <div className='otherField'>
                  <img src={VerifiedImage} />
                  <p className='value'>Verified</p>
                </div>
              </div>

              <div className='timingContainer'>
                {profileDetail?.availability
                  ? profileDetail?.availability.map((avail, index) => {
                      return (
                        <div key={avail?._id} className='timing'>
                          <span>{`${avail?.day} : ${avail?.start_time} - ${avail?.end_time}`}</span>
                        </div>
                      )
                    })
                  : null}
              </div>
            </div>
          </div>
          <div className='rightSideMemberSection'>
            <h2 className='memberSectionHeading'>Insigths</h2>
            <div className='insightContainer'>
              {profileDetail?.experience
                ? profileDetail?.experience.map((exp) => {
                    return (
                      <StyleCategoryCard key={exp?.category_id}>
                        <div className='imageContainer'>
                          <img src={''} className='categoryImage' />
                        </div>
                        <div className='labelContainer'>
                          <span className='label'>{exp?.name}</span>
                        </div>
                      </StyleCategoryCard>
                    )
                  })
                : null}
            </div>

            <h2 className='memberSectionHeading'>Bio</h2>

            <p className='bioDetail'>{profileDetail?.about}</p>

            <div className='memberButtonContainer'>
              <ScheduleCallButtonStyle onClick={handleScheduleCall}>
                Schedule a Call
              </ScheduleCallButtonStyle>
              <SendMessageButtonStyle
                onClick={() => onSendMessage(profileDetail?.id)}
                disabled={messageApi.isLoading}
              >
                {messageApi.isLoading ? 'Loading' : 'Send Message'}
              </SendMessageButtonStyle>
            </div>

            <h2 className='memberSectionHeading mt-4'>Social Media</h2>

            {getSocialMediaIcons(profileDetail?.social_media)}
          </div> */}
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: scheduleMeetingStyle
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <ScheduleMeeting
              email={profileDetail?.email}
              type='connect'
              onClose={() => {
                handleClose()
              }}
            />
          </Menu>
        </MemberContainerStyle>
      )}
    </>
  )
}

Member.defaultProps = {
  isEdit: false
}

export default Member
