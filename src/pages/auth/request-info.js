import { useNavigate, useParams } from "react-router-dom";
import main_icon from "../../assets/images/main_icon.svg";
import ImageIcon, {
  Header,
  InfoCard,
} from "../../style-component/auth/request-info";
import { DarkGrayLable } from "../../style-component/general";
import { ButtonWithShedo, Lable } from "../../style-component/auth/login";

const RequestInfo = () => {
  const navigate = useNavigate();
  const { emailId } = useParams();
  const LoginClickHandler = () => {
    navigate(`/auth`);
  };
  return (
    <InfoCard>
      <Header>
        <ImageIcon src={main_icon} alt="mail" />{" "}
        <DarkGrayLable style={{ padding: 0, margin: 0 }}>
          &nbsp;Check your email
        </DarkGrayLable>
      </Header>
      <Lable>
        Your temporary password has been successfully sent to {emailId}.
      </Lable>
      <ButtonWithShedo onClick={LoginClickHandler}>
        Back to login
      </ButtonWithShedo>
    </InfoCard>
  );
};

export default RequestInfo;
