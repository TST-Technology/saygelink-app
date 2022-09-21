import styled from "styled-components";
import { devices } from "../../utils/constants";
import theme from "../../utils/variables";

export const Navber = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  color: white;
  background: blue;
`;
export const ImageWrapper = styled.img`
  margin-left: 60px;
  height: 23px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`;

export const NavIconWrapper = styled.img`
  height: 23px;
`;

export const TextNavbar = styled.a`
  color: white;
  display: block;
  text-decoration: none;
  height: 30px;
`;
