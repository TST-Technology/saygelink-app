import styled from "styled-components";
import { devices } from "../../utils/constants";
import theme from "../../utils/variables";
import { DarkGrayLable, PinkLink } from "../general";
import { EventCard, EventCardText, EventContainer } from "./event-card";

export const ContentCard = styled(EventCard)`
  margin-top: 20px;
  width: 600px;
  border-radius: 10px;
  padding: 20px;
  @media ${devices.tablet} {
    display: block;
    width: 320px;
  }

  @media ${devices.mobileL} {
    display: block;
    width: 320px;
  }
`;
export const ContentContainer = styled(EventContainer)`
  justify-content: start;
  min-height: 0px;
  padding: 0px 10px;
  text-align: center;
  align-items: center;
  margin-bottom: 30px;
`;
export const DescriptionContainer = styled(ContentContainer)``;
export const ContentMainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Contentblock = styled.div`
  display: block;
  justify-content: center;
  width: 180px;
  text-align: start;
  margin-left: 8px;
`;
export const ContentText = styled(DarkGrayLable)`
  font-weight: ${theme.lightTheme.weight.normalBold};
  font-size: ${theme.lightTheme.font.medium};
`;
export const ContentTextChat = styled(ContentText)`
  font-size: 20px;
  text-align: start;
  line-height: 25px;
  color: ${theme.lightTheme.secondary.font};
`;
export const ContentTextmessage = styled(ContentTextChat)`
  font-size: 10px;
  color: ${theme.lightTheme.ternory.font};
  line-height: 0px;
  margin-top: -20px;
`;
export const ContentPink = styled(PinkLink)`
  color: ${theme.lightTheme.secondary.font};
  font-size: 30px;
`;
export const HeadCardText = styled(EventCardText)`
  color: ${theme.lightTheme.secondary.font};
  text-align: start;
  font-size: 20px;
`;
export const ChatIconWrapper = styled.img`
  height: 30px;
`;
export const CatIconWrapper = styled.img`
  height: 280px;
  width: 560px;
  @media ${devices.tablet} {
    width: 250px;
    height: 120px;
  }

  @media ${devices.mobileL} {
    width: 250px;
    height: 120px;
  }
`;
