import React from 'react'
import {
  StyleCard,
  StyleCardIcon,
  StyleText
} from '../../style-component/createAccount/gender-card'

const SelectGender = ({ text, icon }) => {
  return (
    <StyleCard>
      <StyleText>{text}</StyleText>

      <StyleCardIcon>
        <img src={icon} />
      </StyleCardIcon>
    </StyleCard>
  )
}

export default SelectGender
