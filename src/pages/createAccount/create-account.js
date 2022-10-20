import React, { useState, createContext } from 'react'
import CreateAccountWrapper, {
  Dot,
  PlanItem,
  RegisterLeftSideBarLogoWrapper,
  RegisterLeftSideBarWrapper,
  StepStatus,
  StepWrapper,
  WhiteLineText,
  StepperBodyContainer
} from '../../style-component/createAccount/create-account'
import shortLogo from '../../assets/images/short_logo.png'
import CONSTANT from '../../utils/constants'
import Yourself from './tell-about-youself'
import UploadProfilePicture from './upload-profile-picture'
import Availability from './availability'
import Experiences from './experiences'

export const CreateAccountContext = createContext({
  step: 1,
  setStep: (val) => {},
  formData: null,
  setFormData: (val) => {}
})

const CreateAccount = () => {
  const TOTAL_STEPS = 4
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(null)

  let StepView = <p></p>
  switch (step) {
    case 1:
      StepView = <Yourself />
      break
    case 2:
      StepView = <UploadProfilePicture />
      break
    case 3:
      StepView = <Availability />
      break
    case 4:
      StepView = <Experiences />
      break
    case 5:
      StepView = <p>Congratulations</p>
      break
    default:
      ;<></>
  }
  return (
    <>
      <CreateAccountContext.Provider
        value={{
          step: step,
          setStep: setStep,
          formData: formData,
          setFormData: setFormData
        }}
      >
        <CreateAccountWrapper>
          <RegisterLeftSideBarWrapper>
            <RegisterLeftSideBarLogoWrapper src={shortLogo} />
            <WhiteLineText>Quick & Easy Setup</WhiteLineText>
            <StepWrapper>
              {CONSTANT.planningStage.map((MenuItem, index) => {
                return (
                  <PlanItem
                    key={`MenuItem${index}`}
                    active={index + 1 === step}
                  >
                    <Dot />
                    {MenuItem}
                    {index + 1 === step ? (
                      <StepStatus>{`${step} out of ${TOTAL_STEPS}`}</StepStatus>
                    ) : null}
                  </PlanItem>
                )
              })}
            </StepWrapper>
          </RegisterLeftSideBarWrapper>

          <StepperBodyContainer>
            {StepView}
            {/* <button onClick={() => setStep((previous) => previous + 1)}>
            Click
          </button> */}
          </StepperBodyContainer>
        </CreateAccountWrapper>
      </CreateAccountContext.Provider>
    </>
  )
}

export default CreateAccount
