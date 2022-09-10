import { Routes, Route } from "react-router-dom";

import LoginWraper, {
  HalfScreen,
  LogoContainer,
  LogoWrapper,
} from "../../style-component/auth/login";

import saygelink_logo from "../../assets/images/saygelink_logo.png";
import columbia_logo from "../../assets/images/columbia_logo.png";
import LoginIDPassword from "./login";
import ForgotPassword from "./forgot-password";
import RequestInfo from "./request-info";

const Login = () => {
  return (
    <LoginWraper>
      <HalfScreen>
        <LogoContainer>
          <LogoWrapper src={saygelink_logo} />
          <LogoWrapper src={columbia_logo} />
        </LogoContainer>
      </HalfScreen>
      <HalfScreen>
        <Routes>
          <Route index element={<LoginIDPassword />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="requestsent/:emailId" element={<RequestInfo />} />
        </Routes>
      </HalfScreen>
    </LoginWraper>
  );
};

export default Login;
