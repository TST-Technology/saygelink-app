import styled from "styled-components";
import { devices } from "../../utils/constants";
import theme from "../../utils/variables";
import { Button, CardStyle, GraysmallText } from "../general";
import { LogoWrapper } from "../auth/login";

export const CardWelcome = styled.div`
  ${CardStyle}
  user-select: none;
  width: 400px;

  @media ${devices.laptop} {
    margin: 0px 0px 20px 0px;
  }
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
  ${GraysmallText}
  font-size: ${theme.lightTheme.font.large_25};
  color: ${theme.lightTheme.ternory.font};
`;
export const Textwith = styled(WelcomeText)`
  font-weight: ${theme.lightTheme.weight.bold};
  font-size: ${theme.lightTheme.font.largest};
  color: ${theme.lightTheme.primary.textcolor};
`;
export const WelcomeTextHello = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: ${theme.lightTheme.weight.bold};
  font-size: ${theme.lightTheme.font.xLarge};
  color: ${theme.lightTheme.ternory.font};
`;
export const WelcomeTextspan = styled.span`
  ${WelcomeTextHello}
  color: ${theme.lightTheme.primary.color};
`;
export const WelcomeLogoWrapper = styled.img`
  ${LogoWrapper}
  width: 350px;
  height: 400px;

  @media ${devices.tablet} {
    width: 300px;
  }
  @media ${devices.mobileL} {
    width: 250px;
  }
`;
export const LogoWelcomeheader = styled(WelcomeLogoWrapper)`
  width: 200px;
  height: 150px;
`;
export const LogoWelcometree = styled(WelcomeLogoWrapper)`
  width: 178px;
  height: 180px;
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
  color:${theme.lightTheme.color};
  width: 250px;
`;
