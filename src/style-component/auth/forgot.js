import styled from "styled-components";
import { devices } from "../../utils/constants";
import theme from "../../utils/variables";
import { CardStyle, GraysmallText, Button } from "../general";

const ForgotCard = styled.div`
  ${CardStyle}
  width: 400px;
  height: 320px;
  padding: 30px 50px 20px 50px;
  @media ${devices.tablet} {
    margin: 0px 0px 20px 0px;
    width: 400px;
  }

  @media ${devices.mobileL} {
    margin: 0px 0px 20px 0px;
    width: 300px;
  }
`;

export const LoginText = styled.p`
  ${GraysmallText}
  text-align: center;
  transition: 0.1s;
  cursor: pointer;
  margin: 20px 0px 0px 0px;
  &:hover {
    color: ${theme.lightTheme.color};
    font-weight: ${theme.lightTheme.weight.bold};
  }
  & a {
    color: ${theme.lightTheme.secondary.font};
  }
`;

export const ButtonWithShedo = styled.button`
  ${Button}
  width: 100%;
  margin: 35px 0px 0px 0px;
  font-size: ${theme.lightTheme.font.large};
`;

export default ForgotCard;
