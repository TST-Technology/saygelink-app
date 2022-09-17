import {
  ButtonWithPending,
  CardPending,
  CrossIconPending,
  ImageIconpending,
  PendingLable,
  TextPending,
} from "../../style-component/auth/pending";
import { Header } from "../../style-component/auth/request-info";
import crossIcon2 from "../../assets/images/CrossIcon.svg";

const InfoCard = (props) => {
  return (
    <CardPending>
      <Header>
        <ImageIconpending src={props.iconSrc} alt="reqpendingicon" />
        <PendingLable style={{ padding: 0, margin: 0 }}>
          &nbsp; {props.heading}
        </PendingLable>
        <CrossIconPending src={crossIcon2} alt="crossicon" />
      </Header>
      <TextPending>{props.description}</TextPending>

      {props.btnText != "" && (
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
