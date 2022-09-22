import React from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/general/info-card";
import pendingIcon from "../../assets/images/main_icon.svg";

const SendInvitation = () => {
  const navigate = useNavigate();

  return (
    <InfoCard
      iconSrc={pendingIcon}
      heading="Check your email."
      description="If you’ve been invited to join this network, you will soon receive an email with a special link! If you do not recieve the invite, contact the organization’s admin."
      btnText="Back To Login"
      onClick={() => navigate(`/auth`)}
    />
  );
};
export default SendInvitation;
