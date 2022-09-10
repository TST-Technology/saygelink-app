import { Link, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import ForgotCard, {
  ButtonWithShedo,
  LoginText,
} from "../../style-component/auth/forgot";
import { InputField } from "../../style-component/auth/login";
import { DarkGrayLable } from "../../style-component/general";
import CONSTANT from "../../utils/constants";

const ForgotPassword = () => {
  const forgotPasswordApi = useHttp();
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
    };
    forgotPasswordApi.sendRequest(
      CONSTANT.API.forgot,
      () => navigate(`/auth/requestsent/${e.target.email.value}`),
      payload
    );
  };

  return (
    <ForgotCard>
      <form onSubmit={formSubmitHandler}>
        <DarkGrayLable>Forgot Password</DarkGrayLable>
        <InputField
          name="email"
          type="email"
          required={true}
          placeholder="Email"
        />
        <ButtonWithShedo disabled={forgotPasswordApi.isLoading}>
          {forgotPasswordApi.isLoading ? "Loading..." : "Submit"}
        </ButtonWithShedo>

        <LoginText>
          Back to &nbsp;
          <Link to="/auth" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </LoginText>
      </form>
    </ForgotCard>
  );
};

export default ForgotPassword;
