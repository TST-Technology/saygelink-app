import styled from "styled-components";
import {
  ImageWrapper,
  Navber,
  NavContainer,
  NavIconWrapper,
  TextNavbar,
} from "../../style-component/home/navbar";
import homecolumbiIcon from "../../assets/images/homecolumbiaicon.svg";
import homeIcon from "../../assets/images/homeicon.svg";
import messageIcon from "../../assets/images/messageicon.svg";
import calenderIcon from "../../assets/images/calendaricon.svg";
import globeIcon from "../../assets/images/globeicon.svg";
const NavbarComponent = () => {
  return (
    <Navber>
      <ImageWrapper src={homecolumbiIcon} alt="columbia"></ImageWrapper>
      <NavContainer>
        <div>
          <NavIconWrapper src={homeIcon}></NavIconWrapper>
          <TextNavbar href="#">Home</TextNavbar>
        </div>
        <div>
          <NavIconWrapper src={messageIcon}></NavIconWrapper>
          <TextNavbar href="#">Message</TextNavbar>
        </div>
        <div>
          <NavIconWrapper src={calenderIcon}></NavIconWrapper>
          <TextNavbar href="#">Calendar</TextNavbar>
        </div>
        <div>
          <NavIconWrapper src={globeIcon}></NavIconWrapper>
          <TextNavbar href="#">Network</TextNavbar>
        </div>
      </NavContainer>
    </Navber>
  );
};
export default NavbarComponent;
