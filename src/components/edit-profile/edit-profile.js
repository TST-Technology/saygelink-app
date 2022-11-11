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
import CONSTANT from '../../utils/constants'
import LogoutIcon from '../../assets/images/log-out.svg'

const EditProfile = ({ open, onClose }) => {
  const [selectedGender, setSelectedGender] = useState(CONSTANT.gender[0])
  console.log('called')
  return (
    <EditProfileDialogStyle open={open} onClose={onClose}>
      <div className='dialog'>
        <div className='dialogHeader'>
          <div className='dialogHeadingLeft'>
            <h3 className='dialogTitle'>Edit Profile</h3>
          </div>

          <img className='closeIcon' src={CrossIcon} onClick={onClose} />
        </div>

        <div className='dialogBody'>
          <img src={PersonImage} className='profileImage' />

          <div className='row2'>
            <div>
              <DialogInputStyle type='text' value='James Mary' />
            </div>

            <div>
              <DialogDropdownStyle>
                <option>Alumni</option>
              </DialogDropdownStyle>
            </div>
          </div>

          <div className='row2'>
            <div>
              <DialogDropdownStyle>
                <option>Alumni</option>
              </DialogDropdownStyle>
            </div>

            <GenderContainerStyle>
              {CONSTANT.gender.map((gender, index) => {
                return (
                  <GenderCardStyle
                    selected={selectedGender.value === gender.value}
                    onClick={() => {
                      setSelectedGender(gender)
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

          <UploadContainerStyle>
            <img className='uploadFile' src={LogoutIcon} alt='Upload' />

            <span>Upload attachment</span>
          </UploadContainerStyle>

          <DialogInputStyle placeholder='Tell us about yourself' />

          <SaveChangesButtonStyle>Save Changes</SaveChangesButtonStyle>
        </div>
      </div>
    </EditProfileDialogStyle>
  )
}

export default EditProfile
