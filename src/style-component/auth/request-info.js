import styled from "styled-components";
import { devices } from "../../utils/constants";
import { CardStyle } from "../general";

const ImageIcon = styled.img`
  width: 50px;
`;

export const InfoCard = styled.div`
  ${CardStyle}
  width: 400px;
  height: 320px;
  padding: 40px 40px 20px 40px;
  @media ${devices.tablet} {
    margin: 0px 0px 20px 0px;
    width: 400px;
  }

  @media ${devices.mobileL} {
    margin: 0px 0px 20px 0px;
    width: 300px;
  }
`;

export const Header = styled.div`
  line-height: 0;
  display: flex;
  align-items: center;
`;

export default ImageIcon;
