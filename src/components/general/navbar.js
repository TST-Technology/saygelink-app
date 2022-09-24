import CONSTANT from "../../utils/constants";
import {
  ImageWrapper,
  Navber,
  NavContainer,
  NavIconWrapper,
  TextNavbar,
} from "../../style-component/general/navbar";
import homecolumbiIcon from "../../assets/images/homecolumbiaicon.svg";

const NavbarComponent = () => {
  return (
    <Navber>
      <ImageWrapper src={homecolumbiIcon} alt="columbia"></ImageWrapper>
      <NavContainer>
        {CONSTANT.HOME_MENU.map((Homemenu) => (
          <div key={Homemenu.id}>
            {Homemenu.label ? (
              <div>
                <NavIconWrapper src={Homemenu.image}></NavIconWrapper>
                <TextNavbar href="#">{Homemenu.label}</TextNavbar>
              </div>
            ) : (
              <div>
                <NavIconWrapper src={Homemenu.image}></NavIconWrapper>
              </div>
            )}
          </div>
        ))}
      </NavContainer>
    </Navber>
  );
};
export default NavbarComponent;
