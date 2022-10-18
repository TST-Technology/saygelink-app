import React, { useState } from 'react'
import {
  StyleInput,
  StyleInputButton
} from '../../style-component/createAccount/availability'
import {
  StepperSubtitle,
  StepperSubtitleBold,
  StyleCreateAccountBodyContainer
} from '../../style-component/createAccount/create-account'
import { DarkGrayLable } from '../../style-component/general'

const Availability = () => {
  const [requests, setRequests] = useState(1)
  return (
    <StyleCreateAccountBodyContainer>
      <DarkGrayLable>My availability</DarkGrayLable>
      <div>
        <StepperSubtitleBold>Maximum chat requests</StepperSubtitleBold>
      </div>

      <StepperSubtitle>
        Select a limit for the number of chat requests you would like to recieve
        per month. A higher number avoids missing out on potential connections!
      </StepperSubtitle>

      <StyleInputButton>
        <a
          className='decrement button'
          onClick={() => setRequests((prevValue) => parseInt(prevValue) - 1)}
        >
          -
        </a>
        <StyleInput
          type={'number'}
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
        ></StyleInput>
        <a
          className='increment button'
          onClick={() => setRequests((prevValue) => parseInt(prevValue) + 1)}
        >
          +
        </a>
      </StyleInputButton>
    </StyleCreateAccountBodyContainer>
  )
}

export default Availability
