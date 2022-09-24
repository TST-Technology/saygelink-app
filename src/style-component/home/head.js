import styled from "styled-components";
import { devices } from "../../utils/constants";

export const HeadImageBlue = styled.img`
  height: 150px;
  width: 350px;
  @media ${devices.tablet} {
    width: 300px;
  }

  @media ${devices.mobileL} {
    width: 270px;
  }
`;
export const HeadImageMain = styled.div`
  display: flex;
  justify-centent: center;
  width: 600px;
  @media ${devices.tablet} {
    display: block;
    width: 320px;
  }

  @media ${devices.mobileL} {
    display: block;
    width: 320px;
  }
`;
