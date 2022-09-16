import { Link } from "react-router-dom";

import { InputField } from "../../style-component/auth/login";
import {
  ButtonWithInvite,
  CardInvite,
  LoginTextinvite,
} from "../../style-component/auth/invitelink";
import { DarkGrayLable } from "../../style-component/general";

const InviteLink = () => {
  return (
    <CardInvite>
      <form>
        <DarkGrayLable>
          Request an Invitation from your organization
        </DarkGrayLable>
        <InputField
          fname="fname"
          type="text"
          required={true}
          placeholder="First Name"
        />
        <InputField
          lname="fname"
          type="text"
          required={true}
          placeholder="Last Name"
        />
        <InputField
          name="email"
          type="email"
          required={true}
          placeholder="Email Address"
        />
        <ButtonWithInvite>Request Link</ButtonWithInvite>
        <LoginTextinvite>
          &nbsp; Have an account ? &nbsp;
          <Link to="/auth" style={{ textDecoration: "none" }}>
            log in
          </Link>
        </LoginTextinvite>
      </form>
    </CardInvite>
  );
};

export default InviteLink;
