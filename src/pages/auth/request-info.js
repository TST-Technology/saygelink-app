import { useNavigate, useParams } from "react-router-dom";
import main_icon from "../../assets/images/main_icon.svg";
import InfoCard from "../../components/general/info-card";

const RequestInfo = () => {
  const navigate = useNavigate();
  const { emailId } = useParams();
  const LoginClickHandler = () => {
    navigate(`/auth`);
  };

  return (
    <InfoCard
      iconSrc={main_icon}
      heading="Check your email"
      description={`Your temporary password has been successfully sent to ${emailId}`}
      btnText="Back to login"
      onClick={LoginClickHandler}
    />
  );
};

export default RequestInfo;
