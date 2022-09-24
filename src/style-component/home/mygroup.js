import styled from "styled-components";
import InterestImage from "../../assets/images/Interest.svg";
import { devices } from "../../utils/constants";
import { DarkGrayLable, PinkLink } from "../general";
import {
  ButtonWithEvent,
  EventCard,
  EventCardText,
  EventContainer,
  EventImageContainer,
} from "./event-card";

export const InterestCard = styled(EventCard)`
  margin-top: 16px;
  @media ${devices.tablet} {
    display: block;
    width: 320px;
  }

  @media ${devices.mobileL} {
    display: block;
  }
`;
export const InterestContainer = styled(EventContainer)``;
export const InterestText = styled(DarkGrayLable)`
  font-size: 22px;
  line-height: 60px;
`;
export const InterestPink = styled(PinkLink)``;
export const InterestImageContainer = styled(EventImageContainer)`
  background-image: url(${InterestImage});
  margin-top: 15px;
`;
export const ButtonWithInterest = styled(ButtonWithEvent)``;
export const InterestCardText = styled(EventCardText)``;
