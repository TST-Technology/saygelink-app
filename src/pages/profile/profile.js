import React from 'react'
import PersonImage from '../../assets/images/person.png'
import PlusImage from '../../assets/images/plus.svg'
import EditImage from '../../assets/images/edit.svg'

import {
  AddExperienceButtonStyle,
  ProfileCardStyle,
  ProfileStyleContainer
} from '../../style-component/profile/profile'
import {
  StyleInput,
  StyleInputButton
} from '../../style-component/createAccount/availability'
import CONSTANT from '../../utils/constants'

const Profile = () => {
  return (
    <>
      <ProfileStyleContainer>
        <div className='profileLeftSide'>
          <div className='profileNameCard'>
            <div className='profileNameTop'>
              <div className='profileNameContainer'>
                <img src={PersonImage} />

                <div className='profileNameRightContainer'>
                  <h3>James Mary</h3>
                  <span>Student</span>
                </div>
              </div>

              <div className='countContainer'>
                <p className='count'>10</p>
                <p className='countText'>Posts</p>
              </div>

              <div className='countContainer'>
                <p className='count'>20</p>
                <p className='countText'>Meets</p>
              </div>

              <div className='countContainer'>
                <p className='count'>Bio</p>
                <span className='countDescription'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis
                </span>
              </div>
            </div>
            <div className='profileNameBottom'>
              <div className='shareExperienceContainer'>
                <h3 className='shareExperience'>Share your experiences</h3>
                <AddExperienceButtonStyle>
                  <img src={PlusImage} /> Add Experience
                </AddExperienceButtonStyle>
              </div>

              <div className='experienceTextContainer'>
                <p>Healthcare innovation</p>
                <p>Student Sundry</p>
              </div>
            </div>
          </div>

          <ProfileCardStyle>
            <div>
              <h3 className='profileCardHeading'>Maximum chat requests</h3>

              <p className='tip'>
                Tip: Feel free to select a limit for the number of chat requests
                you'd like per month.
              </p>

              <div className='chatRequestsContainer'>
                <StyleInputButton>
                  <a className='decrement button'>-</a>
                  <StyleInput type={'number'} value={56}></StyleInput>
                  <a className='increment button'>+</a>
                </StyleInputButton>

                <span className='chatRequestsPerMonth'>
                  chat requests per month.
                </span>
              </div>
            </div>

            <div>
              <AddExperienceButtonStyle>
                <img src={EditImage} />
                Edit
              </AddExperienceButtonStyle>
            </div>
          </ProfileCardStyle>

          <ProfileCardStyle>
            <div>
              <h3 className='profileCardHeading'>General Availability</h3>
              <div className='weekDayContainer'>
                {CONSTANT.WEEK_TWO_DIGIT.map((day, index) => {
                  return (
                    <div
                      className={`weekDay ${
                        index == 3 ? 'selectedWeekDay' : ''
                      }`}
                      key={index}
                    >
                      <span>{day}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <AddExperienceButtonStyle>
                <img src={PlusImage} />
                Add
              </AddExperienceButtonStyle>
            </div>
          </ProfileCardStyle>
        </div>

        <div className='profileRightSide'></div>
      </ProfileStyleContainer>
    </>
  )
}

export default Profile
