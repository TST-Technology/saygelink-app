import styled, { css } from "styled-components";
import theme from "../utils/variables";

export const InputStyle = css`
  height: 45px;
  border: 1px solid #e0e0e0;
  border-radius: 9px;
  padding: 2px 18px;

  &:focus {
    border: 1px solid #abe9dc;
    outline: 1px solid #abe9dc;
  }
`;

export const Button = css`
  background: #abe9dc;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(64, 189, 163, 0.4);
  border: 0px;
  font-weight: 600;
  padding: 10px;
  color: ${theme.lightTheme.secondary.color};
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    box-shadow: 0px 2px 13px rgba(64, 189, 163, 0.3);
  }

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    box-shadow: 0px 4px 15px rgb(64 189 163 / 0%);
    color: #e8819a;
    background: #cfece6;
  }
`;

export const GraysmallText = css`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #5c5353;
`;

export const CardStyle = css`
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px rgb(125 125 125 / 10%);
  border-radius: 17px;
  z-index: 1;
  user-select: none;
`;

const BodyStyled = styled.div`
  background-size: cover;
  line-height: 25px;
  padding: 0;
  word-spacing: 0px;
  background: ${theme.lightTheme.background.primary};
  min-height: 100vh;
  color: ${theme.lightTheme.secondary.font};
`;

export const DarkGrayLable = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
`;

export const CheckBox = styled.input``;

export const PinkLink = styled.a`
  color: ${theme.lightTheme.secondary.color};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

export default BodyStyled;
