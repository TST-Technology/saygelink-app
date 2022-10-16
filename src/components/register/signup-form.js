import { Link, useNavigate } from "react-router-dom";
import {
  CheckBoxField,
  InputField,
  Lable,
} from "../../style-component/auth/login";
import {
  ButtonPassshow,
  ButtonWithSignup,
  Cardsignup,
  ImgEye,
  LoginTextsignup,
} from "../../style-component/register/signup";
import { DarkGrayLable, PinkLink } from "../../style-component/general";
import Eye from "../../assets/images/eye.svg";
import Eyeslash from "../../assets/images/eye-off.svg";
import { useState } from "react";
import useHttp from "../../hooks/use-http";
import CONSTANT, { userInviteEmail, UserProfile } from "../../utils/constants";
import { notify } from "../../utils/funcs";

const SignUpForm = () => {
  const [pass, setPass] = useState(false);
  const [confirmpass, setConfirmpass] = useState(false);
  const registerApi = useHttp();
  const navigate = useNavigate();

  const responseHandler = (res) => {
    if (res?.success === true) {
      UserProfile.userDetails["name"] = res?.user?.name;
      navigate(`/welcome`);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target.password);

    if (e.target.password.value !== e.target.confirmPassword.value) {
      notify.error("Password and Confirm Password must be the same");
    } else {
      const payload = {
        organization_id: process.env.REACT_APP_UNIVERSITY_ID,
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      registerApi.sendRequest(CONSTANT.API.register, responseHandler, payload);
    }
  };

  const togglePassword = () => {
    setPass(!pass);
  };
  const toggleConfirmPassword = () => {
    setConfirmpass(!confirmpass);
  };
  return (
    <Cardsignup>
      <form onSubmit={onSubmitHandler}>
        <DarkGrayLable>Sign up</DarkGrayLable>
        <InputField
          name="name"
          type="text"
          required={true}
          placeholder="Full Name"
          defaultValue={`${userInviteEmail.userData?.first_name} ${userInviteEmail.userData?.last_name}`}
        />
        <InputField
          name="email"
          type="email"
          required={true}
          placeholder="Email Address"
          disabled={true}
          defaultValue={userInviteEmail.userData?.email}
        />
        <InputField
          name="password"
          type={pass ? "text" : "password"}
          required={true}
          placeholder="Create Password"
        />
        <ButtonPassshow onClick={togglePassword}>
          {pass === true ? (
            <ImgEye src={Eye}></ImgEye>
          ) : (
            <ImgEye src={Eyeslash}></ImgEye>
          )}
        </ButtonPassshow>

        <InputField
          style={{ marginTop: "30px" }}
          name="confirmPassword"
          type={confirmpass ? "text" : "password"}
          required={true}
          placeholder="Confirm Password  "
        />
        <ButtonPassshow onClick={toggleConfirmPassword}>
          {confirmpass === true ? (
            <ImgEye src={Eye}></ImgEye>
          ) : (
            <ImgEye src={Eyeslash}></ImgEye>
          )}
        </ButtonPassshow>
        <Lable htmlFor="term">
          <CheckBoxField type="checkbox" id="term" required={true} />
          &nbsp; Agree to &nbsp;
          <PinkLink
            href="https://www.saygelink.com/term-of-use"
            target="_blank"
          >
            Term & Conditions
          </PinkLink>
        </Lable>
        <ButtonWithSignup disabled={registerApi.isLoading}>
          {registerApi.isLoading ? "Loading..." : "Sign Up"}
        </ButtonWithSignup>
        <LoginTextsignup>
          &nbsp; Have an account ? &nbsp;
          <Link to="/auth" style={{ textDecoration: "none", color: "#F62E5F" }}>
            log in
          </Link>
        </LoginTextsignup>
      </form>
    </Cardsignup>
  );
};

export default SignUpForm;
