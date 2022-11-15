import styled from 'styled-components'
import { devices } from '../utils/constants'
import theme, { UNIVERSITY_COLOR } from '../utils/variables'

export const HeaderContainerStyle = styled.div`
  background: ${UNIVERSITY_COLOR.primary};
  color: ${theme.lightTheme.seashell};
  height: 70px;

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 90%;
    height: 100%;

    .leftSection {
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        width: 58px;
        height: 56px;
      }

      p {
        color: ${theme.lightTheme.seashell};
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        margin: 0;
      }
    }

    .rightSection {
      display: flex;
      align-items: center;
      gap: 70px;
      height: 100%;

      @media ${devices.laptop} {
        gap: 40px;
      }

      @media ${devices.tablet} {
        gap: 25px;
      }

      .activeHeader {
        border-bottom: 4px solid #f3f3f3;
      }

      .headerTab {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        gap: 4px;
        height: 100%;
        padding: 0 7px;

        .headerTabImage {
          height: 22px;
          width: 22px;
        }

        p {
          color: ${theme.lightTheme.seashell};
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 22px;
          margin: 0;
        }
      }

      .headerImages {
        cursor: pointer;
      }
    }
  }
`
