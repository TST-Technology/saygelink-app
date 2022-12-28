import React, { useState } from 'react'
import useHttp from '../../hooks/use-http'
import {
  DialogInputStyle,
  SaveChangesButtonStyle
} from '../../style-component/profile/edit-profile'
import { AddExperienceStyle } from '../../style-component/profile/profile'
import CONSTANT from '../../utils/constants'
import { notify } from '../../utils/funcs'

const AddExperience = ({ onClose }) => {
  const api = useHttp()
  const [experience, setExperience] = useState('')

  const saveExperience = () => {
    if (experience) {
      const payload = {
        name: experience
      }

      api.sendRequest(
        CONSTANT.API.addCategories,
        handleResponse,
        payload,
        'Experience added successfully!'
      )
    } else {
      notify.error('Please add experience!')
    }
  }

  const handleResponse = () => {
    onClose()
  }

  return (
    <AddExperienceStyle>
      <DialogInputStyle
        value={experience}
        onChange={(e) => {
          setExperience(e.target.value)
        }}
        placeholder='Experience'
      />

      <SaveChangesButtonStyle
        onClick={() => {
          saveExperience()
        }}
      >
        Save
      </SaveChangesButtonStyle>
    </AddExperienceStyle>
  )
}

export default AddExperience
