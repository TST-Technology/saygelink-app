import unauth_icon from "../../assets/images/unauthrizedIcon.svg";
import { InfoCard } from "../../style-component/auth/request-info";

const UnauthenticationInfo = () => {
  return (
    <InfoCard
      iconSrc={unauth_icon}
      heading="Unauthorized"
      description={`It shows that your email id is not registered in the Columbia network.`}
      btnText="Request to join Columbia"
      onClick={() => {}}
    />
  );
};

export default UnauthenticationInfo;
