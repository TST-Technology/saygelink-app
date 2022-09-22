import { UNIVERSITY_DATA, UserProfile } from "../../utils/constants";
import welcomeicon from "../../assets/images/welcomeIcon.svg";
import treeIcon from "../../assets/images/horiz logo.svg";
import RegisterWraper from "../../style-component/register/registerd-styled";
import { HalfScreen, LogoContainer } from "../../style-component/auth/login";
import {
  ButtonWithCreateProfile,
  FullScreenWelcome,
  LogoWelcomeheader,
  LogoWelcometree,
  Textwith,
  WelcomeContainer,
  WelcomeLogoWrapper,
  WelcomeText,
  WelcomeTextHello,
  WelcomeTextspan,
} from "../../style-component/welcome/welcome";

const Welcome = () => {
  return (
    <RegisterWraper>
      <HalfScreen>
        <div>
          <FullScreenWelcome>
            <LogoContainer>
              <LogoWelcometree src={treeIcon}></LogoWelcometree>
            </LogoContainer>
            <LogoContainer>
              <Textwith>With</Textwith>
            </LogoContainer>
            <LogoContainer>
              <LogoWelcomeheader src={UNIVERSITY_DATA.logo}></LogoWelcomeheader>
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
