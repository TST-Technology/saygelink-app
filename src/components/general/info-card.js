import {
  ButtonWithPending,
  CardPending,
  ImageIconpending,
  PendingLable,
  TextPending,
} from "../../style-component/auth/pending";
import { Header } from "../../style-component/auth/request-info";

const InfoCard = (props) => {
  return (
    <CardPending>
      <Header>
        <ImageIconpending src={props.iconSrc} alt="reqpendingicon" />
        <PendingLable>{props.heading}</PendingLable>
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
