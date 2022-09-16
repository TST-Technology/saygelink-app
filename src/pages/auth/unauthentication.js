import { Header } from "../../style-component/auth/request-info";
import {
  ButtonWithMessage,
  TextMessage,
  CardMessage,
  MessageLable,
  ImageIcon,
  CrossIcon,
} from "../../style-component/auth/message";
import unauth_icon from "../../assets/images/unauthrizedIcon.svg";
import crossIcon from "../../assets/images/CrossIcon.svg";

const UnauthenticationInfo = () => {
  return (
    <CardMessage>
      <Header>
        <ImageIcon src={unauth_icon} alt="unauth" />
        <MessageLable style={{ padding: 0, margin: 0 }}>
          &nbsp; Unauthorized
        </MessageLable>
        <CrossIcon src={crossIcon} alt="cross" />
      </Header>
      <TextMessage>
        It shows that your email id is not registered in the Columbia network.{" "}
      </TextMessage>
      <ButtonWithMessage>Request to join Columbia</ButtonWithMessage>
    </CardMessage>
  );
};

export default UnauthenticationInfo;
