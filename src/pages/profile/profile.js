import React, { useEffect, useState } from 'react'
import PersonImage from '../../assets/images/person.png'
import PlusImage from '../../assets/images/plus.svg'
import EditImage from '../../assets/images/edit.svg'
import TrashIcon from '../../assets/images/trash.svg'
import LockIcon from '../../assets/images/lock.svg'
import NotAllowedIcon from '../../assets/images/not-allowed.svg'
import LogoutIcon from '../../assets/images/log-out.svg'

import {
  AddAvailabilityButtonStyle,
  AddExperienceButtonStyle,
  ProfileCardStyle,
  ProfileStyleContainer,
  StyleSingleItem
} from '../../style-component/profile/profile'
import {
  StyleInput,
  StyleInputButton
} from '../../style-component/createAccount/availability'
import CONSTANT, { UserProfile } from '../../utils/constants'
import TimePicker from '../../components/create-account/time-picker'
import theme from '../../utils/variables'
import EditProfile from '../../components/edit-profile/edit-profile'
import useHttp from '../../hooks/use-http'
import { useContext } from 'react'
import { UserContext } from '../../context/user'

const Profile = () => {
  const profileApi = useHttp()
  const [editProfileDialog, setEditProfileDialog] = useState()
  const { setUser, user } = useContext(UserContext)
  const [profileDetail, setProfileDetail] = useState(null)

  useEffect(() => {
    if (user?.user?.email) {
      getProfile()
    }
  }, [])

  const responseHandler = (res) => {
    console.log(res)
    if (res?.userInfo) {
      setProfileDetail({ ...res?.userInfo })
    }
  }

  const getProfile = () => {
    const url = {
      ...CONSTANT.API.getProfileDetail,
      endpoint: CONSTANT.API.getProfileDetail.endpoint.replace(
        ':email',
        user.user.email
      )
    }
    console.log(url)
    profileApi.sendRequest(url, responseHandler)
  }

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

              <div className='viewColumn'>
                {[0, 1].map((row, index) => {
                  return (
                    <div className='viewRow' key={index}>
                      <div className='textContainer'>
                        <p className='durationText'>09:00 AM to 10:00 AM</p>
                      </div>

                      <div className='buttonContainer'>
                        <img src={TrashIcon} />
                      </div>
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

          <ProfileCardStyle>
            <div className='width50'>
              <h3 className='profileCardHeading'>Social Media</h3>

              {[0, 1].map((row, index) => {
                return (
                  <div className='viewRow' key={index}>
                    <div className='textContainer'>
                      <p className='durationText'>Enter Link</p>
                    </div>

                    <div className='buttonContainer'>
                      <img src={TrashIcon} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div>
              <AddExperienceButtonStyle>
                <img src={PlusImage} />
                Add
              </AddExperienceButtonStyle>
            </div>
          </ProfileCardStyle>

          <div className='paddingBottom30'>
            <ProfileCardStyle>
              <div className='width50'>
                <h3 className='profileCardHeading'>Attachments</h3>

                {[0, 1].map((row, index) => {
                  return (
                    <div className='viewRow' key={index}>
                      <div className='textContainer'>
                        <p className='durationText'>File Name -{index + 1}</p>
                      </div>

                      <div className='buttonContainer'>
                        <img src={TrashIcon} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div>
                <AddExperienceButtonStyle>
                  <img src={PlusImage} />
                  Add
                </AddExperienceButtonStyle>
              </div>
            </ProfileCardStyle>
          </div>
        </div>

        <div className='profileRightSide'>
          <ProfileCardStyle column={true} gap={'10px'}>
            <StyleSingleItem onClick={() => setEditProfileDialog(true)}>
              <img src={EditImage}></img>
              <span>Edit Profile</span>
            </StyleSingleItem>

            <StyleSingleItem redColor={true}>
              <img src={LockIcon}></img>
              <span>Update Password</span>
            </StyleSingleItem>

            <StyleSingleItem redColor={true}>
              <img src={NotAllowedIcon}></img>
              <span>Deactivate account</span>
            </StyleSingleItem>

            <StyleSingleItem>
              <img src={LogoutIcon}></img>
              <span>Logout</span>
            </StyleSingleItem>
          </ProfileCardStyle>

          <div className='addTimeContainer'>
            <ProfileCardStyle column={true} gap={'10px'}>
              <p className='timeLabel'>Start Time</p>
              <TimePicker
                name='startTime'
                minute={''}
                hour={''}
                time={''}
                onChangeHour={(val) => {}}
                onChangeMinute={(val) => {}}
                onChangeTime={(val) => {}}
                backgroundColor={theme.lightTheme.softPeach}
              />

              <p className='timeLabel'>End Time</p>
              <TimePicker
                name='endTime'
                minute={''}
                hour={''}
                time={''}
                onChangeHour={(val) => {}}
                onChangeMinute={(val) => {}}
                onChangeTime={(val) => {}}
                backgroundColor={theme.lightTheme.softPeach}
              />

              <div className='availabilityButtonContainer'>
                <AddAvailabilityButtonStyle>
                  Add Availability Slots
                </AddAvailabilityButtonStyle>
              </div>
            </ProfileCardStyle>
          </div>
        </div>
      </ProfileStyleContainer>
      <EditProfile
        open={editProfileDialog}
        onClose={() => setEditProfileDialog(false)}
      />
    </>
  )
}

export default Profile
