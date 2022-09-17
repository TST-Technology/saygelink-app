import { Link } from "react-router-dom";
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
} from "../../style-component/auth/signup";
import { DarkGrayLable, PinkLink } from "../../style-component/general";
import Eye from "../../assets/images/eye.svg";
import Eyeslash from "../../assets/images/eye-off.svg";
import { useState } from "react";

const SignUp = () => {
  const [pass, setPass] = useState(false);
  const [confirmpass, setConfirmpass] = useState(false);

  const togglePassword = () => {
    setPass(!pass);
  };
  const toggleConfirmPassword = () => {
    setConfirmpass(!confirmpass);
  };
  return (
    <Cardsignup>
      <form>
        <DarkGrayLable>Sign up</DarkGrayLable>
        <InputField
          fname="Fullname"
          type="text"
          required={true}
          placeholder="Full Name"
        />
        <InputField
          name="email"
          type="email"
          required={true}
          placeholder="Email Address"
        />
        <InputField
          name="createpassword"
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
          name="confirmpassword"
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
        <ButtonWithSignup>Sign up</ButtonWithSignup>
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

export default SignUp;
