import styled from "styled-components";
import login_background from "../../assets/images/login_background.png";
import { devices } from "../../utils/constants";
import { UNIVERSITY_COLOR } from "../../utils/variables";
import { LineText } from "../general";

const CreateAccountWrapper = styled.div`
  background-image: url(${login_background});
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
}

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

export const RegisterLeftSideBarWrapper = styled.div`
  background: ${UNIVERSITY_COLOR.primary};
  height: 100vh;
  width: 300px;
  padding: 18px;
`;

export const RegisterLeftSideBarLogoWrapper = styled.img`
  height: 50px;
  width: 50px;
`;

export const WhiteLineText = styled.p`
  color: #fff;
  font-size: 18px;
  margin-top: 36px;
  font-weight: 500;
  font-size: 20px;
`;

export const Dot = styled.div`
  background: #fff;
  width: 6px;
  border-radius: 12px;
  height: 6px;
`;

export const PlanItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => (props.active ? "#fff" : "#e1e1e1")};
  margin: ${(props) => (props.active ? "20px 0px" : "5px 0px")};
  font-weight: ${(props) => (props.active ? "800" : "400")};
  font-size: 13px;
`;

export const StepWrapper = styled.div`
  padding-left: 13px;
  display: flex;
  margin-top: 41px;
  flex-direction: column;
`;

export const StepStatus = styled.div`
  background: #fff;
  font-size: 13px;
  padding: 2px 17px;
  font-weight: 600;
  border-radius: 18px;
  color: #fa2f66;
`;
export default CreateAccountWrapper;