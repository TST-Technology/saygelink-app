import { Route, Routes } from "react-router-dom";
import signup_icon from "../../assets/images/RegisterIcon.svg";
import SignUpForm from "../../components/register/signup-form";
import {
  HalfScreen,
  LogoContainer,
  LogoWrapper,
} from "../../style-component/auth/login";

import RegisterWraper from "../../style-component/register/registerd-styled";
import { FullScreen } from "../../style-component/register/signup";

const Signup = () => {
  return (
    <RegisterWraper>
      <FullScreen>
        <HalfScreen>
          <LogoContainer>
            <LogoWrapper
              src={signup_icon}
              style={{ width: "400px", height: "350px" }}
            />
          </LogoContainer>
        </HalfScreen>
        <HalfScreen>
          <Routes>
            <Route path="/" element={<SignUpForm />} />
          </Routes>
        </HalfScreen>
      </FullScreen>
    </RegisterWraper>
  );
};

export default Signup;
