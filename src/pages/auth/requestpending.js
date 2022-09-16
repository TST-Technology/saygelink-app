import React from "react";
import { Header } from "../../style-component/auth/request-info";
import pendingIcon from "../../assets/images/RequestpendingIcon.svg";
import crossIcon2 from "../../assets/images/CrossIcon.svg";
import {
  ButtonWithPending,
  CardPending,
  CrossIconPending,
  ImageIconpending,
  PendingLable,
  TextPending,
} from "../../style-component/auth/pending";

const PendingInfo = () => {
  return (
    <CardPending>
      <Header>
        <ImageIconpending src={pendingIcon} alt="reqpendingicon" />
        <PendingLable style={{ padding: 0, margin: 0 }}>
          &nbsp; Request Pending
        </PendingLable>
        <CrossIconPending src={crossIcon2} alt="crossicon" />
      </Header>
      <TextPending>
        It indicates that your email ID verification is pending, you can contact
        admin Columbia for further assistance.
      </TextPending>
      <ButtonWithPending>Contact Admin</ButtonWithPending>
    </CardPending>
  );
};
export default PendingInfo;
