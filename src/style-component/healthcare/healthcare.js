import styled from 'styled-components'
import theme from '../../utils/variables'
import cardBackgroundImage1 from '../../assets/images/cardBackground1.png'
import cardBackgroundImage2 from '../../assets/images/cardBackground2.png'
import { Button, TextAreaStyle } from '../general'

export const HealthcareContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .healthCareContainer {
    background: #f3f3f3;
    display: flex;
    gap: 20px;
    height: calc(100vh - 70px);
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

        .cardHeading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 0.833333px solid rgba(38, 38, 38, 0.1);

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
          }
        }

        .cardBody {
          margin-top: 15px;

          .cardImage {
            padding: 20px 0;
            background: url(${cardBackgroundImage1});
            background-size: auto;
            background-repeat: round;
            display: flex;
            flex-direction: column;
            justify-content: center;

            a {
              text-decoration: none;
              text-align: center;
              width: fit-content;
              margin: 0 auto;
              background: #fafafa;
              border: 1.66667px solid #4d85eb;
              border-radius: 7.5px;
              padding: 2px 18px;
              color: #4d85eb;
            }
          }

          .cardImage2 {
            padding: 20px 0;
            background: url(${cardBackgroundImage2});
            background-size: auto;
            background-repeat: round;
            display: flex;
            flex-direction: column;
            justify-content: center;

            a {
              text-decoration: none;
              text-align: center;
              width: fit-content;
              margin: 0 auto;
              background: #fafafa;
              border: 1.66667px solid #4d85eb;
              border-radius: 7.5px;
              padding: 2px 18px;
              color: #4d85eb;
            }
          }

          .cardImageText {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 16.6667px;
            line-height: 25px;
            text-align: center;
            color: #ffffff;
          }
        }
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
    console.log(scale)

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

    img {
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
    .socialImage {
      height: 35px;
      width: 35px;
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
`

export const ThoughtsTextArea = styled.textarea`
  ${TextAreaStyle}
  width: 100%;
  height: 93px;
  background: #fefefe;
  border: 0.739055px solid #e8e8e8;
  border-radius: 9.60772px;
  padding: 10px 18px;
  padding-left: 100px;
`

export const StylePostButton = styled.button`
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
  position: absolute;
`
