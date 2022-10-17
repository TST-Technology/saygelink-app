import React, { useState } from "react";
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

const CreateAccount = () => {
  const [step, setStep] = useState(1)

  let StepView = <p></p>
  switch (step) {
    case 1:
      StepView = <Yourself />
      break
    case 2:
      StepView = <p>Now upload your profile picture. </p>
      break
    case 3:
      StepView = <p>My availability </p>
      break
    case 4:
      StepView = <p>Important step! Select the experiences you have.</p>
      break
    case 5:
      StepView = <p>Congratulations</p>
      break
    default:
      ;<></>
  }
  return (
    <>
      <CreateAccountWrapper>
        <RegisterLeftSideBarWrapper>
          <RegisterLeftSideBarLogoWrapper src={shortLogo} />
          <WhiteLineText>Quick & Easy Setup</WhiteLineText>
          <StepWrapper>
            {CONSTANT.planningStage.map((MenuItem, index) => {
              return (
                <PlanItem key={`MenuItem${index}`} active={index + 1 === step}>
                  <Dot />
                  {MenuItem}
                  <StepStatus>fbvhjb</StepStatus>
                </PlanItem>
              )
            })}
          </StepWrapper>
        </RegisterLeftSideBarWrapper>

        <StepperBodyContainer>
          {StepView}
          <button onClick={() => setStep((previous) => previous + 1)}>
            Click
          </button>
        </StepperBodyContainer>
      </CreateAccountWrapper>
    </>
  )
};

export default CreateAccount;
