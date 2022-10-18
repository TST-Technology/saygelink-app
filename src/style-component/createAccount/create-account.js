import styled from "styled-components";
import login_background from "../../assets/images/login_background.png";
import { devices } from "../../utils/constants";
import theme, { UNIVERSITY_COLOR } from '../../utils/variables'
import { Button, LineText } from '../general'

const CreateAccountWrapper = styled.div`
  background-image: url(${login_background});
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
}

  @media ${devices.tablet} {
    justify-content: flex-start;
    flex-direction: column;
    overflow: scroll;
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    overflow: scroll;
  }
`

export const RegisterLeftSideBarWrapper = styled.div`
  background: ${UNIVERSITY_COLOR.primary};
  height: 100vh;
  width: 300px;
  padding: 18px;

  @media ${devices.tablet} {
    width: 100%;
  }
`

export const RegisterLeftSideBarLogoWrapper = styled.img`
  height: 50px;
  width: 50px;
`

export const WhiteLineText = styled.p`
  color: #fff;
  font-size: 18px;
  margin-top: 36px;
  font-weight: 500;
  font-size: 20px;
`

export const Dot = styled.div`
  background: #fff;
  width: 6px;
  border-radius: 12px;
  height: 6px;
`

export const PlanItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => (props.active ? '#fff' : '#e1e1e1')};
  margin: ${(props) => (props.active ? '20px 0px' : '5px 0px')};
  font-weight: ${(props) => (props.active ? '800' : '400')};
  font-size: 13px;
`

export const StepWrapper = styled.div`
  padding-left: 13px;
  display: flex;
  margin-top: 41px;
  flex-direction: column;
`

export const StepStatus = styled.div`
  background: #fff;
  font-size: 13px;
  padding: 2px 17px;
  font-weight: 600;
  border-radius: 18px;
  color: #fa2f66;
`

export const StepperBodyContainer = styled.div`
  width: calc(100% - 300px);
  padding: 5rem 4rem;
  overflow-y: auto;

  @media ${devices.tablet} {
    width: 100%;
  }
`

export const StepperSubtitle = styled.p`
  font-family: Poppins;
  font-size: 16px;
  line-height: 30px;
  font-weight: 400;
  width: 70%;
`

export const StepperSubtitleBold = styled.span`
  font-family: Poppins;
  font-size: 16px;
  line-height: 30px;
  font-weight: 700;
`

export const StyleNextButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`

export const StyleNextButton = styled.button`
  ${Button}
  background-color: ${theme.lightTheme.radicalRed};
  color: ${theme.lightTheme.alabaster};
  padding: 0.7rem 3.8rem;
`
export const StyleCreateAccountBodyContainer = styled.div`
  width: 70%;

  @media ${devices.laptop} {
    width: 100%;
  }

  @media ${devices.tablet} {
    width: 100%;
  }
`
export default CreateAccountWrapper;
