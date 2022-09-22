import styled from "styled-components";
import { devices } from "../../utils/constants";
import theme from "../../utils/variables";
import { LogoWrapper } from "../auth/login";
import { GraysmallText, Button } from "../general";

export const Cardsignup = styled.div`
  user-select: none;
  width: 400px;
  padding: 50px 50px 20px 50px;
  @media ${devices.tablet} {
    margin: 0px 0px 20px 0px;
    width: 400px;
  }

  @media ${devices.mobileL} {
    margin: 0px 0px 20px 0px;
    width: 300px;
  }
`;
export const ButtonWithSignup = styled.button`
  ${Button}
  width: 100%;
`;

export const LoginTextsignup = styled.p`
  ${GraysmallText}
  text-align: center;
  transition: 0.1s;
  cursor: pointer;
  color: ${theme.lightTheme.color};
  font-weight: ${theme.lightTheme.weight.bold};

  & a {
    color: ${theme.lightTheme.color};
  }
`;

export const FullScreen = styled.div`
  display: flex;
  border-radius: 17px;
  justify-content: center;
  box-shadow: 0px 0px 15px rgba(125, 125, 125, 0.1);
  background-color: ${theme.lightTheme.background.primary};
  @media ${devices.tablet} {
    justify-content: flex-start;
    flex-direction: column;
  }

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;
export const ButtonPassshow = styled.div`
  background: none;
  border: none;
  margin-left: 260px;
  margin-top: -33px;
  position: relative;
  display: flex;

  @media ${devices.mobileL} {
    margin-left: 160px;
  }
`;
export const ImgEye = styled.img`
  width: 20px;
  height: 20px;
`;
export const LogoWrapperRegister = styled.img`
  ${LogoWrapper}
  width: 400px;
  @media ${devices.tablet} {
    width: 300px;
  }
  @media ${devices.mobileL} {
    width: 250px;
  }
`;
