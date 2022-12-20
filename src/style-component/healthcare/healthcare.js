import styled from 'styled-components'
import theme from '../../utils/variables'
import cardBackgroundImage1 from '../../assets/images/cardBackground1.png'
import cardBackgroundImage2 from '../../assets/images/cardBackground2.png'
import { Button, TextAreaStyle } from '../general'
import { DashboardHeaderHeight } from '../../utils/constants'

export const HealthcareContainerStyle = styled.div`
  height: calc(100vh - ${DashboardHeaderHeight});

  .healthCareContainer {
    background: #f3f3f3;
    display: flex;
    gap: 20px;
    height: c100%;
    padding: 50px;
    overflow-y: auto;

    .leftContainer {
      width: calc(100vw - 290px);

      .subHeading {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 13.3333px;
        line-height: 20px;
        color: #939393;
      }
    }

    .rightContainer {
      width: 290px;

      .rightSideCard {
        background: #ffffff;
        border-radius: 8.33333px;
        padding: 20px 15px 15px 15px;
        width: 100%;
        margin-top: 20px;
      }
    }

    .heading {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      color: #000000;
    }
  }
`

export const StyleMembersCardContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: auto;
`

export const StyleMembersCard = styled.div`
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 8.4589px;

  ${({ scale }) => {
    if (scale === 1) {
      return {
        scale: '1.2'
      }
    }

    if (scale === 2) {
      return {
        position: 'relative',
        left: '10px'
      }
    }

    if (scale === 3) {
      return {
        scale: '0.9'
      }
    }
  }}

  .headingContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .memberImage {
      height: 50px;
      width: 50px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .memberName {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18.6096px;
    line-height: 28px;
    color: #1186ef;
    margin-top: 20px;
  }

  .skills {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 10.1507px;
    line-height: 15px;
    color: #696f79;
  }

  .insights {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #262626;
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 15px;

    li {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 10.1507px;
      line-height: 15px;
      letter-spacing: 0.06em;
      color: #696f79;
      margin-left: 5px;
      text-transform: uppercase;

      &::before {
        content: '';
        width: 6.77px;
        height: 6.76px;
        background: #1186ef;
        display: inline-block;
        position: relative;
        left: -5px;
        border-radius: 50%;
      }
    }
  }

  .dayText {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10.1507px;
    line-height: 15px;
    color: #696f79;
    margin-bottom: 20px;
    display: inline-block;
  }

  .socialProfileContainer {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    .socialImage {
      height: 20px;
      width: 20px;
    }
  }
`

export const StyleConnectButton = styled.button`
  ${Button}
  margin: 0;
  background: #fa2f66;
  border-radius: 5.07534px;
  color: #f3f3f3;
  padding: 5px 10px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 10.1507px;
  line-height: 15px;
`

export const StyleFeedContainer = styled.div`
  margin-top: 80px;
  margin-bottom: 40px;
  background: #f8f8f8;
  border-radius: 8.33333px;
  width: 100%;
  padding: 20px;
  position: relative;

  .postPreviewImage {
    position: absolute;
    object-fit: cover;
    border-radius: 50%;
    top: 70px;
    left: 40px;
    height: 45px;
    width: 45px;
  }

  .photoInput {
    display: flex;
    align-items: center;
    position: absolute;
    top: 70px;
    right: 40px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #939393;

    img {
      margin-right: 5px;
    }
  }

  .postContainer {
    margin-top: 20px;
  }
`

export const ThoughtsTextArea = styled.textarea`
  ${TextAreaStyle}
  width: 100%;
  height: 93px;
  background: #fefefe;
  border: 0.739055px solid #e8e8e8;
  border-radius: 9.60772px;
  padding: 10px 100px;
`

export const StylePostButton = styled.button`
  ${Button}
  margin: 0;
  color: #f3f3f3;
  padding: 5px 25px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 10.1507px;
  line-height: 15px;
  position: absolute;
  background: #1186ef;
  border: 1.47811px solid #1186ef;
  border-radius: 6.65149px;
  box-shadow: none;
  top: 110px;
  right: 40px;
`
