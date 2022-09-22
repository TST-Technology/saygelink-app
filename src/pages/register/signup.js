import { Route, Routes } from "react-router-dom";
import signup_icon from "../../assets/images/RegisterIcon.svg";
import SignUpForm from "../../components/register/signup-form";
import { HalfScreen, LogoContainer } from "../../style-component/auth/login";

import RegisterWraper from "../../style-component/register/registerd-styled";
import {
  FullScreen,
  LogoWrapperRegister,
} from "../../style-component/register/signup";

const Signup = () => {
  return (
    <RegisterWraper>
      <FullScreen>
        <HalfScreen>
          <LogoContainer>
            <LogoWrapperRegister src={signup_icon} />
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
