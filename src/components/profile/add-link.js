import React, { useState } from 'react'
import useHttp from '../../hooks/use-http'
import {
  DialogInputStyle,
  SaveChangesButtonStyle
} from '../../style-component/profile/edit-profile'
import { AddExperienceStyle } from '../../style-component/profile/profile'
import CONSTANT from '../../utils/constants'
import { notify, prepareLink } from '../../utils/funcs'

const AddLink = ({ onClose }) => {
  const api = useHttp()
  const [link, setLink] = useState('')

  const saveLink = () => {
    if (link) {
      const preparedLink = prepareLink(link)
      const payload = {
        social_media_info: preparedLink
      }

      api.sendRequest(
        CONSTANT.API.addLink,
        handleResponse,
        payload,
        'Link added successfully!'
      )
    } else {
      notify.error('Please add link!')
    }
  }

  const handleResponse = () => {
    onClose()
  }

  return (
    <AddExperienceStyle>
      <DialogInputStyle
        type='url'
        value={link}
        onChange={(e) => {
          setLink(e.target.value)
        }}
        placeholder='Enter Link'
      />

      <SaveChangesButtonStyle
        onClick={() => {
          saveLink()
        }}
      >
        {api.isLoading ? 'Saving...' : 'Save'}
      </SaveChangesButtonStyle>
    </AddExperienceStyle>
  )
}

export default AddLink
