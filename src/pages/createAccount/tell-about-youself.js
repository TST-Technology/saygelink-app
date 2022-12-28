import React, { useState, useContext } from "react";
import { DarkGrayLable } from "../../style-component/general";
import {
  StepperSubtitle,
  StepperSubtitleBold,
  StyleCreateAccountBodyContainer,
  StyleNextButton,
  StyleNextButtonContainer,
} from "../../style-component/createAccount/create-account";
import {
  RoledDropdown,
  SaveButton,
  StyleAddLink,
  StyledInput,
  StyleDropdownContainer,
  StyledTextareaContainer,
  StyleFlexJustifyBetweenContainer,
  StyleInputContainer,
  TextAreaStyled,
} from "../../style-component/createAccount/tell-about-youself";
import SelectGender from "../../components/create-account/gender-card";
import CONSTANT from "../../utils/constants";
import CloseIcon from "../../assets/images/CrossIcon.svg";
import { CreateAccountContext } from "./create-account";
import useHttp from "../../hooks/use-http";
import { notify, prepareLink } from '../../utils/funcs'

const Yourself = () => {
  const [selectedGender, setSelectedGender] = useState()
  const [allLinks, setAllLinks] = useState([''])

  const userApi = useHttp()

  const { formData, setStep, setFormData, step } =
    useContext(CreateAccountContext)

  const onGenderChange = (val) => {
    console.log(val)
    setSelectedGender(val)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const payload = preparePayload(e)
    if (selectedGender) {
      if (payload) {
        userApi.sendRequest(
          CONSTANT.API.updateUser,
          handleUserResponse,
          payload,
          'Details added successfully!'
        )
      }
    } else {
      notify.error('Please select gender')
    }
  }

  const handleUserResponse = (resp) => {
    console.log(resp)
    if (resp) {
      setStep((prevValue) => prevValue + 1)
    }
  }

  const preparePayload = (e) => {
    const newPayload = {}
    if (e.target.about.value) {
      newPayload.about = e.target.about.value
    }
    if (e.target.role.value) {
      newPayload.role = e.target.role.value.toLowerCase()
    }
    if (selectedGender) {
      newPayload.gender = selectedGender
    }

    const links = allLinks.map((row) => {
      const newLink = prepareLink(row)
      return newLink
    })

    if (
      links &&
      Array.isArray(links) &&
      links.length > 0 &&
      links[0] &&
      links[0]?.url
    ) {
      newPayload.social_media = links
    }

    return newPayload
  }

  const handleLinkChange = (val, index) => {
    setAllLinks((prevValue) => {
      prevValue[index] = val
      return [...prevValue]
    })
  }

  const onAddLink = () => {
    setAllLinks((prevValue) => {
      return [...prevValue, '']
    })
  }

  const removeLink = (index) => {
    setAllLinks((prevValue) => {
      const temp = prevValue.slice()
      temp.splice(index, 1)
      return [...temp]
    })
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <StyleCreateAccountBodyContainer>
          <DarkGrayLable>Tell us about yourself</DarkGrayLable>
          <StepperSubtitle>
            <StepperSubtitleBold>What’s your story?</StepperSubtitleBold> Other
            ideas: How do you spend your free time. Best career decision. An
            ah-ha moment in your life.
          </StepperSubtitle>

          <StyledTextareaContainer>
            <div>
              <TextAreaStyled
                name='about'
                placeholder='Type here'
                rows={4}
              ></TextAreaStyled>
            </div>
          </StyledTextareaContainer>

          <StyleDropdownContainer>
            <DarkGrayLable>My pronouns</DarkGrayLable>

            <SelectGender
              items={CONSTANT.gender}
              selectedItemLabel={selectedGender}
              onCardClick={onGenderChange}
            />
          </StyleDropdownContainer>

          <StyleDropdownContainer>
            <DarkGrayLable>Role</DarkGrayLable>
            <RoledDropdown name='role'>
              <option></option>
              {CONSTANT.role.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                )
              })}
            </RoledDropdown>
          </StyleDropdownContainer>

          <StyleInputContainer>
            <StyleFlexJustifyBetweenContainer>
              <DarkGrayLable>Social & Other Links</DarkGrayLable>
              <StyleAddLink
                onClick={() => {
                  onAddLink()
                }}
              >
                + Add
              </StyleAddLink>
            </StyleFlexJustifyBetweenContainer>
            {allLinks.map((link, index) => {
              return (
                <div className='rowContainer' key={index}>
                  <StyledInput
                    type={'url'}
                    value={link}
                    onChange={(e) => handleLinkChange(e.target.value, index)}
                    name='link'
                  />

                  {allLinks.length > 1 ? (
                    <img
                      className='closeIcon'
                      src={CloseIcon}
                      onClick={() => removeLink(index)}
                    />
                  ) : null}
                </div>
              )
            })}
          </StyleInputContainer>
        </StyleCreateAccountBodyContainer>
        <StyleNextButtonContainer>
          <StyleNextButton disabled={userApi.isLoading}>
            {userApi.isLoading ? `Loading...` : `Next`}
          </StyleNextButton>
        </StyleNextButtonContainer>
      </form>
    </>
  )
};

export default Yourself;
