import styled from "styled-components";
import { devices } from "../../utils/constants";
export const HomeEvent = styled.div`
  align-items: center;
  text-align: center;
  justify-content: space-beetween;
`;

export const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 30px;
  background: #d0d0d0;
  @media ${devices.tablet} {
    display: flex;
    width: 320px;
    padding: 0px;
  }

  @media ${devices.mobileL} {
    display: block;
    width: 300px;
    padding: 0px;
  }
`;

export const ContentWrapperHome = styled.div`
  width: 600px;
  display: block;
  align-items: center;
  text-align: center;
  justify-content: space-beetween;
  @media ${devices.tablet} {
    display: block;
    width: 600px;
  }

  @media ${devices.mobileL} {
    display: block;
    width: 300px;
  }
`;
