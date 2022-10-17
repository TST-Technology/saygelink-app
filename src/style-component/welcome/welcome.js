import styled from "styled-components";
import { devices } from "../../utils/constants";
import { Button, HeadingStyle, LineText } from "../general";
import theme, { UNIVERSITY_COLOR } from "../../utils/variables";
import { LogoWrapper } from "../auth/login";

export const HalfScreen = styled.div`
  width: 50%;
  heigth: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${devices.tablet} {
    width: 100%;
    height: 100%;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export const WelcomeTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;

  @media ${devices.desktop} {
    margin-left: 61px;
  }
`;
export const WelcomeText = styled.p`
  ${LineText}
  font-family: "Poppins";
  font-style: normal;
  color: ${theme.lightTheme.ternory.font};
`;

export const WelcomeLogoWrapper = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50px;
  left: 50px;

  @media ${devices.desktop} {
    width: 75px;
    height: 75px;
    top: 77px;
    left: 92px;
  }

  @media ${devices.laptop} {
    width: 60px;
    height: 60px;
    top: 58px;
    left: 90px;
  }
`;

export const WelcomeTextHello = styled.h1`
  ${HeadingStyle}
  font-family: "Poppins";
  font-style: normal;
  color: ${theme.lightTheme.fontColor.darkFornt};
`;
export const WelcomeTextspan = styled.span`
  ${HeadingStyle}
  font-family: "Poppins";
  font-style: normal;
  color: ${theme.lightTheme.fontColor.pinkFonrt};
`;
export const WelcomeImageWrapper = styled(LogoWrapper)`
  width: 400px;
  @media ${devices.tablet} {
    width: 300px;
  }

  @media ${devices.mobileL} {
    width: 250px;
  }
`;
export const WelcomeContainer = styled.div`
  margin-top: 30px;
  margin-left: 10px;
  justify-content: space-between;
  align-items: center;

  @media ${devices.tablet} {
    display: block;
    text-align: center;
  }

  @media ${devices.mobileL} {
    display: block;
    text-align: center;
  }
`;
export const ButtonWithCreateProfile = styled.button`
  ${Button}
  color:#fff;
  width: 250px;
  background: ${UNIVERSITY_COLOR.primary};
  box-shadow: 0px 4px 15px rgba(17, 134, 239, 0.4);
`;
