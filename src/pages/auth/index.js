import { Routes, Route } from "react-router-dom";
import saygelink_logo from "../../assets/images/saygelink_logo.png";
import LoginIDPassword from "./login";
import ForgotPassword from "./forgot-password";
import RequestInfo from "./request-info";
import InviteLink from "./invite-link";
import UnauthenticationInfo from "./unauthentication";
import PendingInfo from "./requestpending";
import SendInvitation from "./send-invitation";
import { UNIVERSITY_DATA } from "../../utils/constants";
import LoginWraper, {
  HalfScreen,
  LogoContainer,
  LogoWrapper,
} from "../../style-component/auth/login";

const Login = () => {
  return (
    <LoginWraper>
      <HalfScreen>
        <LogoContainer>
          <LogoWrapper src={saygelink_logo} />
          <LogoWrapper src={UNIVERSITY_DATA.logo} />
        </LogoContainer>
      </HalfScreen>
      <HalfScreen>
        <Routes>
          <Route index element={<LoginIDPassword />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="requestsent/:emailId" element={<RequestInfo />} />
          <Route path="invitelink" element={<InviteLink />} />
          <Route path="unauthentication" element={<UnauthenticationInfo />} />
          <Route path="pendingreq" element={<PendingInfo />} />
          <Route path="sendinvitation" element={<SendInvitation />} />
        </Routes>
      </HalfScreen>
    </LoginWraper>
  );
};

export default Login;
