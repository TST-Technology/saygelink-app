import CONSTANT from "../../utils/constants";
import { EventPink } from "../../style-component/home/event-card";
import {
  ButtonWithInterest,
  InterestCard,
  InterestCardText,
  InterestContainer,
  InterestImageContainer,
  InterestText,
} from "../../style-component/home/mygroup";

const InterestInfo = () => {
  return (
    <InterestCard>
      <InterestContainer>
        <InterestText>Interest</InterestText>
        <EventPink>View all</EventPink>
      </InterestContainer>
      <hr></hr>
      {CONSTANT.INTEREST_DATA.map((data) => (
        <InterestImageContainer key={data.id}>
          <InterestCardText>{data.description}</InterestCardText>
          <ButtonWithInterest>{data.txtbtn}</ButtonWithInterest>
        </InterestImageContainer>
      ))}
    </InterestCard>
  );
};
export default InterestInfo;
