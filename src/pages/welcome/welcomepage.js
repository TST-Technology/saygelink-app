import RegisterWraper from "../../style-component/register/registerd-styled";
import {
  HalfScreen,
  LogoContainer,
  LogoWrapper,
} from "../../style-component/auth/login";
import {
  ButtonWithCreateProfile,
  FullScreenWelcome,
  Textwith,
  WelcomeContainer,
  WelcomeLogoWrapper,
  WelcomeText,
  WelcomeTextHello,
  WelcomeTextspan,
} from "../../style-component/welcome/welcome";
import welcomeicon from "../../assets/images/welcomeIcon.svg";
import treeIcon from "../../assets/images/horiz logo.svg";
import { UNIVERSITY_DATA, UserProfile } from "../../utils/constants";

const Welcome = () => {
  return (
    <RegisterWraper>
      <HalfScreen>
        <div>
          <FullScreenWelcome>
            <LogoContainer>
              <LogoWrapper
                src={treeIcon}
                style={{ height: "190px", width: "178px" }}
              ></LogoWrapper>
            </LogoContainer>
            <LogoContainer>
              <Textwith>With</Textwith>
            </LogoContainer>
            <LogoContainer>
              <LogoWrapper
                src={UNIVERSITY_DATA.logo}
                style={{ height: "154px", width: "216px" }}
              ></LogoWrapper>
            </LogoContainer>
          </FullScreenWelcome>
          <WelcomeContainer>
            <WelcomeTextHello>
              Hello ,
              <WelcomeTextspan>{UserProfile.userDetails?.name}</WelcomeTextspan>
            </WelcomeTextHello>
            <WelcomeText>Welcome To Columbia HPM SAYge Link</WelcomeText>
            <ButtonWithCreateProfile>
              Create Your Profile
            </ButtonWithCreateProfile>
          </WelcomeContainer>
        </div>
      </HalfScreen>
      <HalfScreen>
        <LogoContainer>
          <WelcomeLogoWrapper src={welcomeicon}></WelcomeLogoWrapper>
        </LogoContainer>
      </HalfScreen>
    </RegisterWraper>
  );
};
export default Welcome;
