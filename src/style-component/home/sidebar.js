import styled from "styled-components";
import { devices } from "../../utils/constants";
import theme from "../../utils/variables";
import { DarkGrayLable } from "../general";
import { ButtonWithEvent, EventCard } from "./event-card";

export const CategoryCard = styled(EventCard)`
  width: 320px;
  @media ${devices.tablet} {
    display: block;
    width: 320px;
  }

  @media ${devices.mobileL} {
    display: block;
    width: 320px;
  }
`;

export const CategoryText = styled(DarkGrayLable)`
  font-weight: ${theme.lightTheme.weight.normalBold};
  font-size: 20px;
  text-align: start;
  margin-left: 25px;
  padding-top: 15px;
  color: ${theme.lightTheme.secondary.font};
`;
export const ButtonWithCategory = styled(ButtonWithEvent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 15px;
  width: 300px;
  height: 40px;
  font-size: ${theme.lightTheme.font.largeM};
  background: ${theme.lightTheme.black};
  border-radius: 10px;
  color: ${theme.lightTheme.secondary.font};
  font-weight: ${theme.lightTheme.weight.bold};
  box-shadow: 0px 0px 4px rgba(159, 159, 159, 0.12);

  @media ${devices.mobileL} {
    width: 300px;
  }
`;

export const IconArrow = styled.img`
  height: 11px;
  color: ${theme.lightTheme.secondary.black};
  margin-left: 80px;
`;
