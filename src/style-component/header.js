import styled from 'styled-components'
import { devices } from '../utils/constants'
import theme, { UNIVERSITY_COLOR } from '../utils/variables'
import { FlexAlignCenter } from './general'

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

export const NotificationContainerStyle = styled.div`
  padding: 20px 30px;
  height: 400px;
  width: 500px;
  overflow-y: auto;

  .notification {
    border-bottom: 1px solid #d0d0d0;

    .textContainer {
      ${FlexAlignCenter}
      gap: 30px;

      .round {
        height: 12px;
        width: 12px;
        background: #1186ef;
        border-radius: 50%;
      }

      .text {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #5c5353;
        margin: 5px 0;
      }
    }

    .time {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #bcbcbc;
      margin: 0;
      text-align: right;
      margin-bottom: 3px;
    }
  }
`