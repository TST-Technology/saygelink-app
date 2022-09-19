import React from "react";
import pendingIcon from "../../assets/images/RequestpendingIcon.svg";
import InfoCard from "../../components/general/info-card";

const PendingInfo = () => {
  return (
    <InfoCard
      iconSrc={pendingIcon}
      heading="Request Pending"
      description="It indicates that your email ID verification is pending, you can contact admin Columbia for further assistance."
      btnText="Contact Admin"
      onClick={() => {}}
    />
  );
};
export default PendingInfo;
