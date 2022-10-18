import React from 'react'
import {
  StyleCard,
  StyleCardIcon,
  StyleText,
  StyleGenderContainer
} from '../../style-component/createAccount/gender-card'

const SelectGender = ({ items, selectedItemLabel, onCardClick }) => {
  return (
    <StyleGenderContainer>
      {items &&
        items.map((item) => {
          return (
            <StyleCard
              key={item.label}
              selected={item.label === selectedItemLabel}
              onClick={() => {
                onCardClick(item.label)
              }}
            >
              <StyleText>{item.label}</StyleText>

              <StyleCardIcon>
                <img src={item.icon} />
              </StyleCardIcon>
            </StyleCard>
          )
        })}
    </StyleGenderContainer>
  )
}

export default SelectGender
