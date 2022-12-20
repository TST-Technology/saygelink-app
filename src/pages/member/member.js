import React from 'react'
import ImageRole from '../../components/general/image-role'
import {
  MemberContainerStyle,
  ScheduleCallButtonStyle,
  SendMessageButtonStyle,
  StyleCategoryCard
} from '../../style-component/member/member'

const Member = () => {
  return (
    <MemberContainerStyle>
      <div className='leftSideMemberSection'>
        <div className='profileDetail'>
          <div className='nameContainer'>
            <div>
              <ImageRole src='' alt='' className='profileMemberImage' />
            </div>

            <div className='nameRoleContainer'>
              <h3>Name</h3>
              <span>Role</span>
            </div>
          </div>

          <div className='otherFieldsContainer'>
            <div className='otherField'>
              <b className='title'>75</b>
              <p className='value'>Post</p>
            </div>

            <div className='otherField'>
              <b className='title'>75</b>
              <p className='value'>Post</p>
            </div>
            <div className='otherField'>
              <b className='title'>75</b>
              <p className='value'>Post</p>
            </div>
          </div>

          <div className='timingContainer'>
            <div className='timing'>
              <span>10:00 am - 12:00 am</span>

              <span className='active'></span>
            </div>
            <div className='timing'>
              <span>10:00 am - 12:00 am</span>

              <span className='active'></span>
            </div>
          </div>
        </div>
      </div>
      <div className='rightSideMemberSection'>
        <h2 className='memberSectionHeading'>Insigths</h2>
        <div className='insightContainer'>
          <StyleCategoryCard>
            <div className='imageContainer'>
              <img src={''} className='categoryImage' />
            </div>
            <div className='labelContainer'>
              <span className='label'>Category</span>
            </div>
          </StyleCategoryCard>
        </div>

        <h2 className='memberSectionHeading'>Bio</h2>

        <p className='bioDetail'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis Lorem ipsum dolor sit amet,
          consectetur adipiscing elit ut aliquam, purus sit amet luctus
          venenatis Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
          aliquam, purus sit amet luctus venenatis{' '}
        </p>

        <div className='memberButtonContainer'>
          <ScheduleCallButtonStyle>Schedule a Call</ScheduleCallButtonStyle>
          <SendMessageButtonStyle>Send Message</SendMessageButtonStyle>
        </div>

        <h2 className='memberSectionHeading mt-4'>Social Media</h2>
      </div>
    </MemberContainerStyle>
  )
}

export default Member
