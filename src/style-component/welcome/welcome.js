import styled from "styled-components";
import { devices } from "../../utils/constants";
import { Button } from "../general";
import theme from "../../utils/variables";
import { LogoWrapper } from "../auth/login";

export const CardWelcome = styled.div`
  user-select: none;
  width: 400px;

  @media ${devices.tablet} {
    margin: 0px 0px 20px 0px;
  }

  @media ${devices.mobileL} {
    margin: 0px 0px 20px 0px;
    width: 300px;
  }
`;
export const FullScreenWelcome = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  @media ${devices.tablet} {
    display: block;
  }

  @media ${devices.mobileL} {
    display: block;
  }
`;
export const WelcomeText = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  color: ${theme.lightTheme.ternory.font};
`;
export const Textwith = styled(WelcomeText)`
  font-weight: 600;
  font-size: 30px;
  color: ${theme.lightTheme.primary.textcolor};
`;
export const WelcomeTextHello = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  color: ${theme.lightTheme.ternory.font};
`;
export const WelcomeTextspan = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  color: ${theme.lightTheme.primary.color};
`;
export const WelcomeLogoWrapper = styled(LogoWrapper)`
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
  color:#000;
  width: 250px;
`;
