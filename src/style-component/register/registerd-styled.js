import styled from "styled-components";
import login_background from "../../assets/images/login_background.png";
import { devices } from "../../utils/constants";

const RegisterWraper = styled.div`
  background-image: url(${login_background});
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${devices.tablet} {
    justify-content: flex-start;
    flex-direction: column;
    overflow: scroll;
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    overflow: scroll;
  }
`;

export default RegisterWraper;
