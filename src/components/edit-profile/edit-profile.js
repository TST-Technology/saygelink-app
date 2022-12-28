import React, { useState } from 'react'
import {
  DialogDropdownStyle,
  DialogInputStyle,
  EditProfileDialogStyle,
  GenderCardStyle,
  GenderContainerStyle,
  SaveChangesButtonStyle,
  UploadContainerStyle
} from '../../style-component/profile/edit-profile'
import CrossIcon from '../../assets/images/close.svg'
import CONSTANT, { ACCEPT_IMAGE_TYPE } from '../../utils/constants'
import {
  capitalizeFirstLetter,
  getQualificationYear,
  notify
} from '../../utils/funcs'
import useHttp from '../../hooks/use-http'
import ImageRole from '../general/image-role'

const EditProfile = ({ open, onClose, profileDetail }) => {
  const profileApi = useHttp()
  const [selectedGender, setSelectedGender] = useState(() => {
    return profileDetail?.gender
  })
  const [selectedRole, setSelectedRole] = useState(() => {
    return profileDetail?.qualification
      ? capitalizeFirstLetter(profileDetail?.qualification)
      : null
  })
  const [profileImage, setPdfFile] = useState(null)
  const yearList = getQualificationYear()
  const [qualificationYear, setQualificationYear] = useState(() => {
    return profileDetail?.qualification_year
      ? profileDetail?.qualification_year
      : null
  })

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setPdfFile(file)
    }
  }

  const preparePayload = (e) => {
    const newPayload = {}
    if (e.target.name.value) {
      newPayload.name = e.target.name.value
    }
    if (e.target.about.value) {
      newPayload.about = e.target.about.value
    }
    if (e.target.role.value) {
      newPayload.role = e.target.role.value.toLowerCase()
    }
    if (selectedGender) {
      newPayload.gender = selectedGender
    }

    return newPayload
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const payload = preparePayload(e)
    if (payload && payload.name && payload.gender && payload.role) {
      profileApi.sendRequest(
        CONSTANT.API.updateUser,
        handleUserResponse,
        payload
      )
    } else {
      notify.error('Please enter required fields')
    }
  }

  const handleUserResponse = () => {
    if (profileImage) {
      const formData = new FormData()
      formData.append('image', profileImage)
      profileApi.sendRequest(
        CONSTANT.API.uploadUserProfilePicture,
        handleImageChangeResponse,
        formData,
        'Profile updated successfully!'
      )
    } else {
      handleImageChangeResponse()
      onClose(true)
    }
  }

  const handleImageChangeResponse = () => {
    const param = {
      qualification: selectedRole.toLowerCase(),
      qualification_year: qualificationYear
    }

    console.log(param)
    profileApi.sendRequest(
      CONSTANT.API.updateUserQualification,
      () => {
        onClose(true)
      },
      param,
      'Profile updated successfully!'
    )
  }

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
  }

  const handleYearChange = (e) => {
    setQualificationYear(e.target.value)
  }

  return (
    <EditProfileDialogStyle
      open={open}
      onClose={() => {
        onClose(false)
      }}
    >
      <div className='dialog'>
        <div className='dialogHeader'>
          <div className='dialogHeadingLeft'>
            <h3 className='dialogTitle'>Edit Profile</h3>
          </div>

          <img
            className='closeIcon'
            src={CrossIcon}
            onClick={() => {
              onClose(false)
            }}
          />
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className='dialogBody'>
            <label htmlFor='uploadAttachment' className='profileImage'>
              <input
                name='uploadAttachment'
                type='file'
                id='uploadAttachment'
                hidden
                onChange={handleImageChange}
                accept={ACCEPT_IMAGE_TYPE}
              />
              <ImageRole
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : profileDetail?.profile_image
                }
                className='profileImage'
                role={profileDetail?.qualification}
              />
            </label>

            <div className='row2'>
              <div>
                <DialogInputStyle
                  name='name'
                  type='text'
                  defaultValue={profileDetail?.name}
                  placeholder={'Enter name'}
                />
              </div>

              <div>
                <DialogDropdownStyle name='role' onChange={handleRoleChange}>
                  {CONSTANT.role.map((role) => {
                    return (
                      <option
                        selected={role.value === selectedRole}
                        key={role.value}
                        value={role.value}
                      >
                        {role.label}
                      </option>
                    )
                  })}
                </DialogDropdownStyle>
              </div>
            </div>

            <div className='row2'>
              {selectedRole !== 'Faculty' ? (
                <div>
                  <DialogDropdownStyle
                    name='qualificationYear'
                    onChange={handleYearChange}
                  >
                    {yearList.map((year) => {
                      return (
                        <option
                          selected={year.value === qualificationYear}
                          key={year.value}
                          value={year.value}
                        >
                          {year.label}
                        </option>
                      )
                    })}
                  </DialogDropdownStyle>
                </div>
              ) : null}

              <GenderContainerStyle>
                {CONSTANT.gender.map((gender, index) => {
                  return (
                    <GenderCardStyle
                      selected={selectedGender === gender.value}
                      onClick={() => {
                        setSelectedGender(gender.value)
                      }}
                      key={gender.value}
                      first={index === 0}
                      last={index === CONSTANT.gender.length - 1}
                    >
                      <span>{gender.label}</span>
                    </GenderCardStyle>
                  )
                })}
              </GenderContainerStyle>
            </div>

            <DialogInputStyle
              name='about'
              defaultValue={profileDetail?.about}
              placeholder='Tell us about yourself'
            />

            <SaveChangesButtonStyle disabled={profileApi.isLoading}>
              {profileApi.isLoading ? 'Saving...' : 'Save Changes'}
            </SaveChangesButtonStyle>
          </div>
        </form>
      </div>
    </EditProfileDialogStyle>
  )
}

export default EditProfile
