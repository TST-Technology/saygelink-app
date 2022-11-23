import styled from 'styled-components'
import { DashboardHeaderHeight, devices } from '../../utils/constants'
import theme from '../../utils/variables'
import { Button, FlexAlignCenter, FlexJustifyCenter } from '../general'
import BackgroundImage from '../../assets/images/homeBackground.png'

export const DashboardContainerStyle = styled.div`
  ${(props) => {
    if (props.includeHeader) {
      return {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }}
`

const HEADER_LEFT_WIDTH = 'min(320px, 20%)'
const HEADER_RIGHT_WIDTH = 'min(350px, 30%)'

export const HomeContainerStyle = styled.div`
  background: ${theme.lightTheme.quillGrey};
  height: calc(100vh - ${DashboardHeaderHeight});
  overflow-y: auto;

  .homeBackgroundContainer {
    height: 400px;
    width: 100%;
    background-image: url(${BackgroundImage});
    background-position: right;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 100px 0 0 100px;

    .homeBannerTextContainer {
      display: flex;
      gap: 20px;
      align-items: flex-end;

      @media ${devices.laptop} {
        flex-direction: column;
        align-items: flex-start;
        padding: 50px 0 0 50px;
      }

      .blackText {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 48px;
        text-transform: uppercase;
        color: ${theme.lightTheme.primary.textcolor};
      }

      .bgLogo {
        height: 52px;
        width: 255px;
        object-fit: contain;
        margin-bottom: 5px;
      }
    }

    .homeBannerButtonContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px 20px 20px 40px;
      gap: 20px;
      background: #f8f8f8;
      box-shadow: 0px 2px 10px rgba(95, 95, 95, 0.1);
      border-radius: 20px;
      width: fit-content;
      margin-top: 50px;

      p {
        margin: 0;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        color: #262626;
      }
    }
  }

  .homeContentContainer {
    background-color: ${theme.lightTheme.aquaHaze};
    border-radius: 20px 20px 0px 0px;
    position: relative;
    top: -20px;
    padding: 50px;
    display: flex;
    gap: 20px;

    @media ${devices.laptop} {
      padding: 30px;
    }

    > div {
      border-left: 1px solid ${theme.lightTheme.greyGoose};

      &:first-child {
        border-left: none;
      }
    }

    .homeContentLeftContainer {
      width: ${HEADER_LEFT_WIDTH};
      display: flex;
      flex-direction: column;
      gap: 20px;

      > div,
      img {
        padding-bottom: 20px;

        &:last-child {
          border-bottom: none;
        }
      }
    }

    .homeContentCenterContainer {
      width: calc(100% - ${HEADER_LEFT_WIDTH} - ${HEADER_RIGHT_WIDTH});
      padding: 0 20px;

      .categoryContainer {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
      }

      .postTitle {
        color: ${theme.lightTheme.secondary.font};
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        padding: 30px 0;
        border-bottom: 1px solid rgba(38, 38, 38, 0.1);
      }
    }

    .homeContentRightContainer {
      width: ${HEADER_RIGHT_WIDTH};
      padding-left: 20px;

      @media ${devices.laptop} {
        padding-left: 15px;
      }

      .calenderTitle {
        color: ${theme.lightTheme.primary.textcolor};
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
      }

      .connectionContainer {
        margin-top: 30px;

        .connectionItem {
          ${FlexAlignCenter};
          gap: 20px;
          margin-top: 25px;

          .connectionImage {
            object-fit: contain;
            height: 44px;
            width: 44px;
            border-radius: 50%;
          }

          .connectionName {
            color: ${theme.lightTheme.primary.font};
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            margin: 0;
          }

          .connectionTime {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 10px;
            line-height: 15px;
            color: #fa2f66;
          }
        }

        .connectionLink {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: #afafaf;
          text-decoration: none;
          cursor: pointer;
        }

        .meetingButtonContainer {
          ${FlexAlignCenter};
          justify-content: center;
          gap: 20px;
          margin-top: 10px;

          .meetingButton {
            margin: 0;
            box-shadow: none;
            heigh: fit-content;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #000000;
            padding: 10px;
            text-decoration: none;
            background: ${theme.lightTheme.primary.color};
            border-radius: 6px;
            cursor: pointer;
          }
        }
      }
    }

    .cardHeading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: none;

      p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 16.6667px;
        color: #262626;
        margin-bottom: 0;
      }

      span {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 13.3333px;
        line-height: 16px;
        color: #f62e5f;
        cursor: pointer;
      }
    }
  }
`

export const BottomFixedStyle = styled.div`
  position: fixed;
  bottom: 0;
  right: 30px;
  height: 64px;
  min-width: 420px;
  padding: 0 20px;
  ${FlexAlignCenter};
  justify-content: space-between;
  background: ${theme.lightTheme.black};
  box-shadow: 0px -3px 14px rgba(52, 52, 52, 0.15);
  border-radius: 10px 10px 0px 0px;

  .nameContainer {
    ${FlexAlignCenter}
    gap: 20px;

    p {
      margin: 0;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 15.8482px;
      line-height: 24px;
      color: ${theme.lightTheme.primary.textcolor};
    }
  }

  .buttonContainer {
    display: flex;
    gap: 20px;
    .arrow {
      transform: rotate(-90deg);
    }

    .count {
      ${FlexJustifyCenter};
      align-items: center;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      background: ${theme.lightTheme.radicalRed};
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 15.8482px;
      line-height: 24px;
      color: ${theme.lightTheme.black};
    }
  }
`

export const FindSaygeButtonStyle = styled.button`
  ${Button}
  color: ${theme.lightTheme.black};
  background: #fa2f66;
  border-radius: 6px;
  box-shadow: none;
  margin: 0;
  display: flex;
  gap: 10px;
  padding: 10px 30px;
`
