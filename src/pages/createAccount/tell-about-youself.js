import React, { useState } from 'react'
import { DarkGrayLable } from '../../style-component/general'
import {
  StepperSubtitle,
  StepperSubtitleBold,
  StyleNextButton,
  StyleNextButtonContainer
} from '../../style-component/createAccount/create-account'
import {
  RoledDropdown,
  SaveButton,
  StyleAddLink,
  StyledInput,
  StyleDropdownContainer,
  StyledTextareaContainer,
  StyleFlexJustifyBetweenContainer,
  StyleGenderContainer,
  StyleInputContainer,
  StyleRoleContainer,
  StyleYourselfContainer,
  TextAreaStyled
} from '../../style-component/createAccount/tell-about-youself'
import SelectGender from '../../components/create-account/gender-card'
import CONSTANT from '../../utils/constants'

const Yourself = () => {
  const [selectedGender, setSelectedGender] = useState()

  const onGenderChange = (val) => {
    setSelectedGender(val)
  }

  return (
    <StyleYourselfContainer>
      <DarkGrayLable>Tell us about yourself</DarkGrayLable>
      <StepperSubtitle>
        <StepperSubtitleBold>What’s your story?</StepperSubtitleBold> Other
        ideas: How do you spend your free time. Best career decision. An ah-ha
        moment in your life.
      </StepperSubtitle>

      <StyledTextareaContainer>
        <div>
          <TextAreaStyled placeholder='Type here' rows={4}></TextAreaStyled>
        </div>
        <SaveButton>Save</SaveButton>
      </StyledTextareaContainer>

      <StyleDropdownContainer>
        <DarkGrayLable>Role</DarkGrayLable>
        <RoledDropdown>
          <option></option>
          <option>option 1</option>
          <option>option 2</option>
          <option>option 3</option>
        </RoledDropdown>
      </StyleDropdownContainer>

      <StyleInputContainer>
        <StyleFlexJustifyBetweenContainer>
          <DarkGrayLable>Social & Other Links</DarkGrayLable>
          <StyleAddLink>+ Add</StyleAddLink>
        </StyleFlexJustifyBetweenContainer>
        <StyledInput />
      </StyleInputContainer>

      <StyleDropdownContainer>
        <DarkGrayLable>My pronouns</DarkGrayLable>

        <SelectGender
          items={CONSTANT.gender}
          selectedItemLabel={selectedGender}
          onCardClick={onGenderChange}
        />
      </StyleDropdownContainer>

      <StyleNextButtonContainer>
        <StyleNextButton>Next</StyleNextButton>
      </StyleNextButtonContainer>
    </StyleYourselfContainer>
  )
}

export default Yourself
