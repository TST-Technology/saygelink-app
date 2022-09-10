import styled from "styled-components";
import login_background from "../../assets/images/login_background.png";
import { devices } from "../../utils/constants";
import { Button, CardStyle, GraysmallText, InputStyle } from "../general";

const LoginWraper = styled.div`
  background-image: url(${login_background});
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: end;

  @media ${devices.tablet} {
    justify-content: flex-start;
    flex-direction: column;
    overflow: scroll;
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    overflow: scroll;
  }
`;

export const HalfScreen = styled.div`
  width: 50%;
  heigth: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${devices.tablet} {
    width: 100%;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  row-gap: 100px;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-size: 28px;
  text-align: center;
  font-weight: 600;
  flex-direction: column;

  @media ${devices.tablet} {
    row-gap: 30px;
    margin-top: 24px;
    font-size: 25px;
    margin-bottom: 40px;
  }

  @media ${devices.mobileL} {
    row-gap: 22px;
    margin-top: 24px;
    font-size: 25px;
    margin-bottom: 40px;
  }
`;

export const LogoWrapper = styled.img`
  width: 300px;

  @media ${devices.tablet} {
    width: 250px;
  }

  @media ${devices.mobileL} {
    width: 200px;
  }
`;

export const Card = styled.div`
  ${CardStyle}
  width: 400px;
  height: ${({ isPasswordVisible }) => (isPasswordVisible ? "450px" : "350px")};
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

export const InputField = styled.input`
  ${InputStyle}
  width: 100%;
  margin: 20px 0px 0px 0px;
`;

export const ForGotText = styled.p`
  ${GraysmallText}
  text-align: end;
  transition: 0.1s;
  cursor: pointer;
  margin: 15px 0px 0px 0px;
  &:hover {
    color: #000;
    font-weight: 600;
  }
`;

export const Lable = styled.label`
  display: flex;
  align-items: center;
  margin: 43px 0px 0px 0px;
`;

export const CheckBoxField = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #5c5353;
  border-radius: 3px;

  &.checked {
    color: #000;
  }
`;

export const ButtonWithShedo = styled.button`
  ${Button}
  width: 100%;
  margin: 25px 0px;
  font-size: 16px;
`;
export default LoginWraper;
