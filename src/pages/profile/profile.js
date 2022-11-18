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
  StyleSingleItem,
  AddFileStyle
} from '../../style-component/profile/profile'
import {
  StyleInput,
  StyleInputButton
} from '../../style-component/createAccount/availability'
import CONSTANT, {
  DashboardHeaderHeight,
  UserProfile
} from '../../utils/constants'
import TimePicker from '../../components/create-account/time-picker'
import theme from '../../utils/variables'
import EditProfile from '../../components/edit-profile/edit-profile'
import useHttp from '../../hooks/use-http'
import { useContext } from 'react'
import { UserContext } from '../../context/user'
import Loader from '../../components/general/loader'
import { getEmail, isEmptyArray } from '../../utils/funcs'
import Dialog from '../../components/dialog/dialog'
import AddExperience from '../../components/profile/add-experience'
import AddLink from '../../components/profile/add-link'

const Profile = () => {
  const profileApi = useHttp()
  const userApi = useHttp()
  const chatRequestApi = useHttp()
  const [editProfileDialog, setEditProfileDialog] = useState()
  const { setUser, user } = useContext(UserContext)
  const [profileDetail, setProfileDetail] = useState(null)
  const [maximumRequests, setMaximumRequests] = useState(null)
  const email = getEmail()
  const [maximinRequestsChanged, setMaximinRequestsChanged] = useState(false)
  const [experienceDialogVisible, setExperienceDialogVisible] = useState(false)
  const [linkDialogVisible, setLinkDialogVisible] = useState(false)
  const ACCEPT_FILE_TYPE = 'application/pdf'
  const [pdfFile, setPdfFile] = useState(null)

  useEffect(() => {
    console.log(user)
    if (email) {
      getProfile()
    }
  }, [])

  const responseHandler = (res) => {
    console.log(res)
    if (res?.userInfo) {
      setProfileDetail({ ...res?.userInfo })
      setMaximumRequests(res?.userInfo?.max_chat_requests)
    }
  }

  const getProfile = () => {
    const url = {
      ...CONSTANT.API.getProfileDetail,
      endpoint: CONSTANT.API.getProfileDetail.endpoint.replace(':email', email)
    }
    console.log(url)
    profileApi.sendRequest(url, responseHandler)
  }

  const updateProfile = (payload) => {
    chatRequestApi.sendRequest(
      CONSTANT.API.updateUser,
      () => {},
      payload,
      'Profile updated successfully!'
    )
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

  const updateChatRequests = () => {
    const payload = {
      max_chat_requests: maximumRequests
    }
    chatRequestApi.sendRequest(
      CONSTANT.API.updateUser,
      () => {},
      payload,
      'Maximum chat requests updated successfully!'
    )
  }

  const handleCloseExperienceDialog = (apiCall) => {
    if (apiCall) {
      getProfile()
    }
    setExperienceDialogVisible(false)
  }

  const handleCloseLinkDialog = (apiCall) => {
    if (apiCall) {
      getProfile()
    }
    setLinkDialogVisible(false)
  }

  const handleDeleteLinkClick = (link) => {
    if (link?._id) {
      const url = {
        ...CONSTANT.API.deleteLink,
        endpoint: CONSTANT.API.deleteLink.endpoint.replace(':id', link?._id)
      }
      profileApi.sendRequest(url, getProfile, {}, 'Link deleted successfully!')
    }
  }

  const handlePdfChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setPdfFile(file)
      handleUploadFile(file)
    }
  }

  const handleUploadFile = (pdfFile) => {
    if (pdfFile) {
      const formData = new FormData()
      formData.append('file', pdfFile)
      profileApi.sendRequest(
        CONSTANT.API.uploadUserFile,
        getProfile,
        formData,
        'Attachment added successfully!'
      )
    }
  }

  const deleteUserFile = () => {
    profileApi.sendRequest(
      CONSTANT.API.deleteFile,
      getProfile,
      {},
      'Attachment deleted successfully!'
    )
  }

  return (
    <>
      {profileApi.isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
        <ProfileStyleContainer>
          <div className='profileLeftSide'>
            <div className='profileNameCard'>
              <div className='profileNameTop'>
                <div className='profileNameContainer'>
                  <img src={profileDetail?.profile_image} />

                  <div className='profileNameRightContainer'>
                    <h3>{profileDetail?.name}</h3>
                    <span>{profileDetail?.qualification}</span>
                  </div>
                </div>

                <div className='countContainer'>
                  <p className='count'>{profileDetail?.num_posts}</p>
                  <p className='countText'>Posts</p>
                </div>

                <div className='countContainer'>
                  <p className='count'>{profileDetail?.num_meets}</p>
                  <p className='countText'>Meets</p>
                </div>

                <div className='countContainer'>
                  <p className='count'>Bio</p>
                  <span className='countDescription'>
                    {profileDetail?.about}
                  </span>
                </div>
              </div>
              <div className='profileNameBottom'>
                <div className='shareExperienceContainer'>
                  <h3 className='shareExperience'>Share your experiences</h3>
                  <AddExperienceButtonStyle
                    onClick={() => {
                      // setExperienceDialogVisible(true)
                    }}
                  >
                    <img src={PlusImage} /> Add Experience
                  </AddExperienceButtonStyle>
                </div>

                <div className='experienceTextContainer'>
                  {profileDetail && !isEmptyArray(profileDetail?.experience)
                    ? profileDetail?.experience.map((exp) => {
                        return <p key={exp.category_id}>{exp?.name}</p>
                      })
                    : null}
                </div>
              </div>
            </div>

            <ProfileCardStyle>
              <div>
                <h3 className='profileCardHeading'>Maximum chat requests</h3>

                <p className='tip'>
                  Tip: Feel free to select a limit for the number of chat
                  requests you'd like per month.
                </p>

                <div className='chatRequestsContainer'>
                  <StyleInputButton>
                    <a
                      className='decrement button'
                      onClick={() => {
                        onChatRequestChange('-')
                      }}
                    >
                      -
                    </a>
                    <StyleInput
                      type={'number'}
                      value={maximumRequests}
                      onChange={(e) => {
                        onChatRequestChange(e)
                      }}
                    ></StyleInput>
                    <a
                      className='increment button'
                      onClick={() => {
                        onChatRequestChange('+')
                      }}
                    >
                      +
                    </a>
                  </StyleInputButton>

                  <span className='chatRequestsPerMonth'>
                    chat requests per month.
                  </span>
                </div>
              </div>

              <div>
                <AddExperienceButtonStyle
                  onClick={() => updateChatRequests()}
                  disabled={chatRequestApi.isLoading || !maximinRequestsChanged}
                >
                  {chatRequestApi.isLoading ? `Loading...` : `Save`}
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

                {profileDetail && !isEmptyArray(profileDetail?.social_media)
                  ? profileDetail?.social_media.map((row, index) => {
                      return (
                        <div className='viewRow' key={index}>
                          <div className='textContainer'>
                            <a href={row?.url} className='durationText'>
                              {row?.name}
                            </a>
                          </div>

                          <div
                            className='buttonContainer'
                            onClick={() => handleDeleteLinkClick(row)}
                          >
                            <img src={TrashIcon} />
                          </div>
                        </div>
                      )
                    })
                  : null}
              </div>

              <div>
                <AddExperienceButtonStyle
                  onClick={() => {
                    setLinkDialogVisible(true)
                  }}
                >
                  <img src={PlusImage} />
                  Add
                </AddExperienceButtonStyle>
              </div>
            </ProfileCardStyle>

            <div className='paddingBottom30'>
              <ProfileCardStyle>
                <div className='width50'>
                  <h3 className='profileCardHeading'>Attachments</h3>
                  {profileDetail?.file ? (
                    <div className='viewRow'>
                      <div className='textContainer'>
                        <a href={profileDetail?.file} className='durationText'>
                          File
                        </a>
                      </div>

                      <div
                        className='buttonContainer'
                        onClick={() => {
                          deleteUserFile()
                        }}
                      >
                        <img src={TrashIcon} />
                      </div>
                    </div>
                  ) : (
                    <b>No Attachments</b>
                  )}
                </div>

                <div className='attachmentContainer'>
                  <label htmlFor='attachment' className='attachment'>
                    <input
                      name='attachment'
                      type='file'
                      id='attachment'
                      hidden
                      onChange={handlePdfChange}
                      accept={ACCEPT_FILE_TYPE}
                    />
                    <AddFileStyle>
                      <img src={PlusImage} />
                      Add
                    </AddFileStyle>
                  </label>
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
      )}
      <EditProfile
        open={editProfileDialog}
        onClose={() => setEditProfileDialog(false)}
      />

      <Dialog
        content={
          <AddExperience onClose={() => handleCloseExperienceDialog(true)} />
        }
        title='Add Experience'
        onClose={() => {
          handleCloseExperienceDialog(false)
        }}
        open={experienceDialogVisible}
        width='500px'
      />

      <Dialog
        content={<AddLink onClose={() => handleCloseLinkDialog(true)} />}
        title='Add Link'
        onClose={() => {
          handleCloseLinkDialog(false)
        }}
        open={linkDialogVisible}
        width='500px'
      />
    </>
  )
}

export default Profile
 