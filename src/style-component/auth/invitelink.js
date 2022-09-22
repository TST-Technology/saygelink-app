import styled from "styled-components";
import { devices } from "../../utils/constants";
import theme from "../../utils/variables";
import { CardStyle, GraysmallText, Button } from "../general";

export const CardInvite = styled.div`
  ${CardStyle}
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
export const ButtonWithInvite = styled.button`
  ${Button}
  width: 100%;
  margin-top: 50px;
`;

export const LoginTextinvite = styled.p`
  ${GraysmallText}
  text-align: center;
  transition: 0.1s;
  cursor: pointer;
  font-weight: ${theme.lightTheme.weight.bold};

  & a {
    color: ${theme.lightTheme.color};
  }
`;
