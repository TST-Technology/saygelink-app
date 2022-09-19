import styled from "styled-components";
import {
  ButtonWithPending,
  CardPending,
  PendingLable,
  TextPending,
} from "../../style-component/auth/pending";
import { Header } from "../../style-component/auth/request-info";

export const ImageIconpending = styled.img`
  width: 40px;
  margin-right: 12px;
`;

const InfoCard = (props) => {
  return (
    <CardPending>
      <Header>
        <ImageIconpending src={props.iconSrc} alt="reqpendingicon" />
        <PendingLable style={{ padding: 0, margin: 0 }}>
          {props.heading}
        </PendingLable>
      </Header>
      <TextPending>{props.description}</TextPending>

      {props.btnText !== "" && (
        <ButtonWithPending onClick={props.onClick}>
          {props.btnText}
        </ButtonWithPending>
      )}
    </CardPending>
  );
};

InfoCard.defaultProps = {
  iconSrc: "",
  heading: "",
  description: "",
  btnText: "",
  onClick: () => {},
};

export default InfoCard;
