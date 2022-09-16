import styled from "styled-components";
import { devices } from "../../utils/constants";
import { CardStyle, GraysmallText, Button } from "../general";
import theme from "../../utils/variables";

export const CardMessage = styled.div`
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
export const ButtonWithMessage = styled.button`
  ${Button}
  width: 100%;
  margin: 25px 0px;
  margin-top: 40px;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.lightTheme.secondary.font};
`;

export const TextMessage = styled.p`
  ${GraysmallText}
  display: flex;
  align-items: center;
  margin: 43px 0px 0px 0px;
  color: ${theme.lightTheme.secondary.font};
`;
export const MessageLable = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  color: ${theme.lightTheme.ternory.color};
`;
export const ImageIcon = styled.img`
  width: 40px;
`;
export const CrossIcon = styled.img`
  margin-left: 50px;
  @media ${devices.tablet} {
    margin-left: 0px;
    width: 400px;
  }

  @media ${devices.mobileL} {
    margin-left: 0px;
    width: 300px;
  }
`;
