import styled from "styled-components";
import { devices } from "../../utils/constants";
import { CardStyle, GraysmallText, Button } from "../general";
import theme from "../../utils/variables";

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
  color: #000;
  font-weight: 600;

  & a {
    color: #000;
  }
`;

export const FullScreen = styled.div`
  display: flex;
  border-radius: 17px;
  justify-content: center;
  box-shadow: 0px 0px 15px rgba(125, 125, 125, 0.1);
  background-color: #ffffff;
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
