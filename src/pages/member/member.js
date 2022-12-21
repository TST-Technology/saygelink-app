import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ImageRole from '../../components/general/image-role'
import Loader from '../../components/general/loader'
import useHttp from '../../hooks/use-http'
import VerifiedImage from '../../assets/images/verified.svg'
import FacebookImage from '../../assets/images/profileFacebook.svg'
import LinkedinImage from '../../assets/images/profileLinkedIn.svg'
import InstagramImage from '../../assets/images/profileInstagram.svg'
import TwitterImage from '../../assets/images/profileTwitter.svg'
import LinkImage from '../../assets/images/profileLink.svg'
import {
  MemberContainerStyle,
  ScheduleCallButtonStyle,
  SendMessageButtonStyle,
  StyleCategoryCard
} from '../../style-component/member/member'
import CONSTANT, {
  DashboardHeaderHeight,
  scheduleMeetingStyle
} from '../../utils/constants'
import ScheduleMeeting from '../../components/schedule-meeting/schedule-meeting'
import { Menu } from '@mui/material'
import { UserContext } from '../../context/user'

const Member = () => {
  const api = useHttp()
  const messageApi = useHttp()
  const { memberId } = useParams()
  const [memberDetail, setMemberDetail] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { profileDetail } = useContext(UserContext)

  useEffect(() => {
    getMemberDetail()
  }, [memberId])

  const handleMemberResponse = (resp) => {
    if (resp && resp?.userInfo) {
      setMemberDetail(resp?.userInfo)
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
              <a target='_blank' href={media.url}>
                <img src={image} className='socialImage' />
              </a>
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

  const handleSendMessageResponse = (resp) => {
    if (resp) {
    }
  }

  const onSendMessage = (memberId) => {
    console.log(memberId)

    const payload = {
      participants: [memberId, profileDetail?.id]
    }
    messageApi.sendRequest(
      CONSTANT.API.getOrCreateConversation,
      handleSendMessageResponse,
      payload
    )
  }

  return (
    <>
      {api.isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
        <MemberContainerStyle>
          <div className='leftSideMemberSection'>
            <div className='profileDetail'>
              <div className='nameContainer'>
                <div>
                  <ImageRole src='' alt='' className='profileMemberImage' />
                </div>

                <div className='nameRoleContainer'>
                  <h3>{memberDetail?.name}</h3>
                  <span>{memberDetail?.qualification}</span>
                </div>
              </div>

              <div className='otherFieldsContainer'>
                <div className='otherField'>
                  <b className='title'>{memberDetail?.num_posts}</b>
                  <p className='value'>Post</p>
                </div>

                <div className='otherField'>
                  <b className='title'>{memberDetail?.num_meets}</b>
                  <p className='value'>Meets</p>
                </div>
                <div className='otherField'>
                  <img src={VerifiedImage} />
                  <p className='value'>Verified</p>
                </div>
              </div>

              <div className='timingContainer'>
                {memberDetail?.availability
                  ? memberDetail?.availability.map((avail, index) => {
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
              {memberDetail?.experience
                ? memberDetail?.experience.map((exp) => {
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

            <p className='bioDetail'>{memberDetail?.about}</p>

            <div className='memberButtonContainer'>
              <ScheduleCallButtonStyle onClick={handleScheduleCall}>
                Schedule a Call
              </ScheduleCallButtonStyle>
              <SendMessageButtonStyle
                onClick={() => onSendMessage(memberDetail?.id)}
                disabled={messageApi.isLoading}
              >
                {messageApi.isLoading ? 'Loading' : 'Send Message'}
              </SendMessageButtonStyle>
            </div>

            <h2 className='memberSectionHeading mt-4'>Social Media</h2>

            {getSocialMediaIcons(memberDetail?.social_media)}
          </div>

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
              email={memberDetail?.email}
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

export default Member
