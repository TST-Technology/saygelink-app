import RegisterWraper from "../../style-component/register/registerd-styled";
import { LogoContainer } from "../../style-component/auth/login";
import {
  ButtonWithCreateProfile,
  HalfScreen,
  WelcomeImageWrapper,
  WelcomeLogoWrapper,
  WelcomeText,
  WelcomeTextHello,
  WelcomeTextspan,
  WelcomeTextWrapper,
} from "../../style-component/welcome/welcome";
import welcomeicon from "../../assets/images/welcomeIcon.png";
import shortLogo from "../../assets/images/short_logo.png";
import { UserProfile } from "../../utils/constants";

const Welcome = () => {
  return (
    <RegisterWraper>
      <HalfScreen>
        <WelcomeLogoWrapper src={shortLogo} />
        <WelcomeTextWrapper>
          <WelcomeTextHello>
            Hello,{" "}
            <WelcomeTextspan>{UserProfile.userDetails?.name}</WelcomeTextspan>
          </WelcomeTextHello>
          <WelcomeText>Welcome to Columbia HPM SAYge Link</WelcomeText>
          <ButtonWithCreateProfile>Create your profile</ButtonWithCreateProfile>
        </WelcomeTextWrapper>
      </HalfScreen>
      <HalfScreen>
        <LogoContainer>
          <WelcomeImageWrapper src={welcomeicon}></WelcomeImageWrapper>
        </LogoContainer>
      </HalfScreen>
    </RegisterWraper>
  );
};
export default Welcome;
