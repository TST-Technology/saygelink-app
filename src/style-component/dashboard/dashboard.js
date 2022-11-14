import styled from 'styled-components'
import { DashboardHeaderHeight, devices } from '../../utils/constants'
import theme from '../../utils/variables'
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

const HEADER_LEFT_WIDTH = 'min(320px, 25%)'
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

    .homeBannerTextContainer {
      display: flex;
      gap: 20px;
      align-items: flex-end;
      padding: 100px 0 0 100px;

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
  }

  .homeContentContainer {
    background-color: ${theme.lightTheme.aquaHaze};
    border-radius: 20px 20px 0px 0px;
    position: relative;
    top: -20px;
    padding: 50px;
    display: flex;
    gap: 20px;

    > div {
      border-left: 1px solid ${theme.lightTheme.greyGoose};

      &:first-child {
        border-left: none;
      }
    }

    .homeContentLeftContainer {
      height: 100%;
      width: ${HEADER_LEFT_WIDTH};
      display: flex;
      flex-direction: column;
      gap: 20px;

      > div,
      img {
        border-bottom: 1px solid ${theme.lightTheme.greyGoose};
        padding-bottom: 20px;

        &:last-child {
          border-bottom: none;
        }
      }
    }

    .homeContentCenterContainer {
      height: 100%;
      width: calc(100% - ${HEADER_LEFT_WIDTH} - ${HEADER_RIGHT_WIDTH});
    }

    .homeContentRightContainer {
      height: 100%;
      width: ${HEADER_RIGHT_WIDTH};
    }
  }
`
