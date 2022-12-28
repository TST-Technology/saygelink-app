import React from 'react'
import useHttp from '../../hooks/use-http'
import {
  DialogInputStyle,
  SaveChangesButtonStyle
} from '../../style-component/profile/edit-profile'
import CONSTANT from '../../utils/constants'
import { notify } from '../../utils/funcs'

const UpdatePassword = ({ onClose }) => {
  const api = useHttp()

  const responseHandler = (resp) => {
    console.log(resp)
    onClose()
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const oldPassword = event.target?.oldPassword?.value
    const newPassword = event.target?.newPassword?.value
    const newConfirmPassword = event.target?.newConfirmPassword?.value
    if (oldPassword && newPassword && newConfirmPassword) {
      if (newPassword === newConfirmPassword) {
        const payload = {
          oldPassword: oldPassword,
          newPassword: newPassword
        }
        api.sendRequest(
          CONSTANT.API.updateUserPassword,
          responseHandler,
          payload,
          'Password updated successfully!'
        )
      } else {
        notify.error('Password and confirm password not match!')
      }
    } else {
      notify.error('Please enter password and confirm password')
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <DialogInputStyle
          type='password'
          placeholder='Old Password'
          name='oldPassword'
          className='mb-4'
        />

        <DialogInputStyle
          type='password'
          placeholder='New Password'
          name='newPassword'
          className='mb-4'
        />

        <DialogInputStyle
          type='password'
          placeholder='Confirm Password'
          name='newConfirmPassword'
          className='mb-4'
        />

        <SaveChangesButtonStyle type='submit' disabled={api.isLoading}>
          {api.isLoading ? 'Updating...' : 'Update'}
        </SaveChangesButtonStyle>
      </div>
    </form>
  )
}

export default UpdatePassword
