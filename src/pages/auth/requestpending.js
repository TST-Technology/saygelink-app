import React from "react";
import { useNavigate } from "react-router-dom";
import pendingIcon from "../../assets/images/RequestpendingIcon.svg";
import InfoCard from "../../components/general/info-card";

const PendingInfo = () => {
  const navigate = useNavigate();
  return (
    <InfoCard
      iconSrc={pendingIcon}
      heading="Request Pending"
      description="It indicates that your email ID verification is pending, you can contact admin Columbia for further assistance."
      btnText="Back to Login"
      onClick={() => navigate("/auth")}
    />
  );
};
export default PendingInfo;
