import styled from "styled-components";
import { devices } from "../../utils/constants";
import { CardStyle, GraysmallText, Button } from "../general";
import theme from "../../utils/variables";

export const CardPending = styled.div`
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
export const ButtonWithPending = styled.button`
  ${Button}
  width: 100%;
  margin-top: 40px;
  font-weight: 600;
`;

export const TextPending = styled.p`
  ${GraysmallText}
  display: flex;
  align-items: center;
  margin: 43px 0px 0px 0px;
  color: ${theme.lightTheme.secondary.font};
`;
export const PendingLable = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  color: ${theme.lightTheme.ternory.color};
`;

export const CrossIconPending = styled.img`
  margin-left: 10px;
  @media ${devices.tablet} {
    margin-left: 0px;
    width: 400px;
  }

  @media ${devices.mobileL} {
    margin-left: 0px;
    width: 300px;
  }
`;
