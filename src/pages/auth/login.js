import { useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";

import {
  ButtonWithShedo,
  Card,
  CheckBoxField,
  ForGotText,
  InputField,
  Lable,
} from "../../style-component/auth/login";
import { DarkGrayLable, PinkLink } from "../../style-component/general";
import CONSTANT from "../../utils/constants";

const LoginIDPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginApi = useHttp();

  const CheckUserResponseHandeler = (e) => {
    setIsPasswordVisible(true);
  };

  const CheckUserErrorHandeler = (message) => {
    console.log(message);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (isPasswordVisible) {
      const payload = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      loginApi.sendRequest(CONSTANT.API.login, LoginHandeler, payload);
    } else {
      const url = {
        ...CONSTANT.API.checkUser,
        endpoint: `/auth/whitelist/${process.env.REACT_APP_UNIVERSITY_ID}/${e.target.email.value}`,
      };
      loginApi.sendRequest(
        url,
        CheckUserResponseHandeler,
        null,
        null,
        CheckUserErrorHandeler
      );
    }
  };

  const LoginHandeler = (res) => {
    console.log(res);
    if (res?.token) {
      localStorage.setItem("authToken", res?.data?.token);
    }
  };

  return (
    <Card isPasswordVisible={isPasswordVisible}>
      <form onSubmit={formSubmitHandler}>
        <DarkGrayLable>Login</DarkGrayLable>
        <InputField
          name="email"
          type="email"
          required={true}
          placeholder="Email"
        />

        {isPasswordVisible && (
          <InputField
            name="password"
            type="password"
            required={true}
            placeholder="password"
          />
        )}
        {isPasswordVisible && (
          <Link to="/auth/forgotPassword" style={{ textDecoration: "none" }}>
            <ForGotText>Forgot Password ?</ForGotText>
          </Link>
        )}
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
        <ButtonWithShedo disabled={loginApi.isLoading}>
          {loginApi.isLoading ? "Loading..." : "Log in"}
        </ButtonWithShedo>
      </form>
    </Card>
  );
};

export default LoginIDPassword;
