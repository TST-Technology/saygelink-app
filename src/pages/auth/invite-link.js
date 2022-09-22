import { Link, useNavigate } from "react-router-dom";
import CONSTANT from "../../utils/constants";
import useHttp from "../../hooks/use-http";
import { InputField } from "../../style-component/auth/login";
import {
  ButtonWithInvite,
  CardInvite,
  LoginTextinvite,
} from "../../style-component/auth/invitelink";
import { DarkGrayLable } from "../../style-component/general";

const InviteLink = () => {
  const addUserToWhitelist = useHttp();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      organization_id: process.env.REACT_APP_UNIVERSITY_ID,
      email: e.target.email.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
    };
    addUserToWhitelist.sendRequest(
      CONSTANT.API.addUserToWhitelist,
      () => navigate(`/auth/sendinvitation`),
      payload
    );
  };
  return (
    <CardInvite>
      <form onSubmit={onSubmitHandler}>
        <DarkGrayLable>
          Request an Invitation from your organization
        </DarkGrayLable>
        {CONSTANT.FORM.inviteLink.map((inputField) => (
          <InputField key={inputField.id} {...inputField} />
        ))}
        <ButtonWithInvite disabled={addUserToWhitelist.isLoading}>
          {addUserToWhitelist.isLoading ? "Sending Request..." : "Request Link"}
        </ButtonWithInvite>
        <Link to="/auth" style={{ textDecoration: "none" }}>
          <LoginTextinvite>
            &nbsp; Have an account ? &nbsp; log in
          </LoginTextinvite>
        </Link>
      </form>
    </CardInvite>
  );
};

export default InviteLink;
