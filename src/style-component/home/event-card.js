import styled from "styled-components";
import theme from "../../utils/variables";
import BodyStyled, {
  Button,
  CardStyle,
  DarkGrayLable,
  PinkLink,
} from "../general";
import EventImage from "../../assets/images/EventImage.svg";
import { devices } from "../../utils/constants";

export const EventCard = styled.div`
  ${CardStyle}
  background: ${theme.lightTheme.primary.gray};
  text-align: center;
  width: 320px;
  box-sizing: none;
  box-shadow: none;
  border-radius: 10px;
  padding: 10px;
  @media ${devices.tablet} {
    margin-top: 15px;
    display: block;
  }

  @media ${devices.mobileL} {
    display: block;
    margin-top: 15px;
  }
`;
export const EventContainer = styled(BodyStyled)`
  display: flex;
  justify-content: space-between;
  min-height: 0px;
  text-align: center;
  align-items: baseline;
  margin-bottom: -30px;
`;
export const EventText = styled(DarkGrayLable)`
  font-weight: 600;
  font-size: 22px;
  line-height: 60px;
`;
export const EventPink = styled(PinkLink)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: ${theme.lightTheme.weight.bold};
  cursor: pointer;
  color: ${theme.lightTheme.secondary.color};
  font-size: ${theme.lightTheme.font.largeM};
`;
export const EventImageContainer = styled.div`
  background-image: url(${EventImage});
  background-repeat: no-repeat;
  height: 120px;
  width: 300px;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: block;
`;
export const ButtonWithEvent = styled.button`
  ${Button}
  width: 100px;
  height: 30px;
  font-size: ${theme.lightTheme.font.largeM};
  background: ${theme.lightTheme.black};
  color: ${theme.lightTheme.secondary.black};
  margin: 0px;
  font-weight: ${theme.lightTheme.weight.bold};
  padding: 2px;
`;
export const EventCardText = styled(DarkGrayLable)`
  color: ${theme.lightTheme.black};
  font-size: ${theme.lightTheme.font.largeM};
  line-height: 50px;
`;
