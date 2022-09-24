import styled from "styled-components";
import { devices } from "../../utils/constants";
import theme from "../../utils/variables";

export const Navber = styled.div`
  padding-right: 50px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  color: ${theme.lightTheme.primary.white};
  background: ${theme.lightTheme.blue};
  @media ${devices.tablet} {
    padding-right: 0px;
    margin: 0px 0px 20px 0px;
    display: block;
  }

  @media ${devices.mobileL} {
    padding-right: 0px;
    margin: 0px 0px 20px 0px;
    display: block;
  }
`;
export const ImageWrapper = styled.img`
  width: 25%;
  height: 38px;

  margin-top: 12px;
  margin-bottom: 12px;
  @media ${devices.tablet} {
    width: 100%;
    align-items: center;
  }

  @media ${devices.mobileL} {
    width: 100%;
    align-items: center;
  }
`;

export const NavContainer = styled(Navber)`
  width: 50%;

  @media ${devices.tablet} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export const NavIconWrapper = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const TextNavbar = styled.a`
  font-family: "Poppins";
  font-style: normal;
  font-weight: ${theme.lightTheme.weight.normalBold};
  font-size: ${theme.lightTheme.font.large};
  color: ${theme.lightTheme.primary.white};
  display: block;
  text-decoration: none;
  height: 30px;
`;
