import React from 'react'
import {
  DialogDropdownStyle,
  DialogInputStyle,
  EditProfileDialogStyle
} from '../../style-component/profile/edit-profile'
import CrossIcon from '../../assets/images/close.svg'
import PersonImage from '../../assets/images/person.png'

const EditProfile = ({ open, onClose }) => {
  console.log('called')
  return (
    <EditProfileDialogStyle open={open} onClose={onClose}>
      <div className='dialog'>
        <div className='dialogHeader'>
          <div className='dialogHeadingLeft'>
            <h3 className='dialogTitle'>Edit Profile</h3>
          </div>

          <img src={CrossIcon} onClick={onClose} />
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

            <div></div>
          </div>
        </div>
      </div>
    </EditProfileDialogStyle>
  )
}

export default EditProfile
