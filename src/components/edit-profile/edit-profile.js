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
import PersonImage from '../../assets/images/person.png'
import CONSTANT, {
  ACCEPT_FILE_TYPE,
  ACCEPT_IMAGE_TYPE
} from '../../utils/constants'
import LogoutIcon from '../../assets/images/log-out.svg'
import { notify } from '../../utils/funcs'
import useHttp from '../../hooks/use-http'

const EditProfile = ({ open, onClose, profileDetail, handleUploadFile }) => {
  const profileApi = useHttp()
  const [selectedGender, setSelectedGender] = useState(() => {
    return profileDetail?.gender
  })
  const [selectedRole, setSelectedRole] = useState('Student')

  const [profileImage, setPdfFile] = useState(null)

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
        () => {
          onClose(true)
        },
        formData,
        'Profile updated successfully!'
      )
    } else {
      notify.success('Profile updated successfully!')
      onClose(true)
    }
  }

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
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
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : profileDetail?.profile_image
                }
                className='profileImage'
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
                        selected={role.value === 'Student'}
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
                  <DialogDropdownStyle>
                    <option>Alumni</option>
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
