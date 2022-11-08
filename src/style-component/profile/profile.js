import styled from 'styled-components'
import { DashboardHeaderHeight } from '../../utils/constants'
import theme from '../../utils/variables'
import {
  Button,
  FlexAlignCenter,
  FlexJustifyCenter,
  FlexJustifySpaceBetween,
  SmallWeekDayStyle
} from '../general'

export const ProfileStyleContainer = styled.div`
  height: calc(100vh - ${DashboardHeaderHeight});
  background: ${theme.lightTheme.black};
  padding: 25px 50px;
  overflow-y: auto;
  display: flex;

  .profileLeftSide {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    gap: 20px;

    .profileNameCard {
      background-color: ${theme.lightTheme.seashell};
      border-radius: 8.33333px;

      .profileNameTop {
        border-bottom: 0.833333px solid rgba(38, 38, 38, 0.2);
        padding: 20px;
        ${FlexAlignCenter}
        gap: 20px;
        justify-content: space-between;

        .profileNameContainer {
          ${FlexAlignCenter}
          gap: 20px;

          img {
            width: 75px;
            height: 75px;
            object-fit: cover;
          }

          .profileNameRightContainer {
            h3 {
              color: ${theme.lightTheme.primary.textcolor};
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 600;
              font-size: 21.6667px;
              line-height: 32px;
              margin-bottom: 0;
            }

            span {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 600;
              font-size: 10px;
              line-height: 15px;
              color: rgba(38, 38, 38, 0.3);
            }
          }
        }

        .countContainer {
          .count {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            color: ${theme.lightTheme.white};
            margin-bottom: 0;
          }

          .countText {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 16.6667px;
            line-height: 25px;
            color: ${theme.lightTheme.boulder};
            margin-bottom: 0;
          }

          .countDescription {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 10px;
            line-height: 15px;
            color: rgba(38, 38, 38, 0.3);
          }
        }
      }

      .profileNameBottom {
        padding: 20px;

        .shareExperienceContainer {
          ${FlexJustifySpaceBetween}

          .shareExperience {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            color: ${theme.lightTheme.primary.textcolor};
          }
        }

        .experienceTextContainer {
          display: flex;
          gap: 20px;
          margin-top: 20px;

          p {
            background: ${theme.lightTheme.black};
            box-shadow: 0px 0px 3.33333px rgba(159, 159, 159, 0.12);
            border-radius: 8.33333px;
            padding: 10px 15px;
            margin: 0;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 16.6667px;
            line-height: 25px;
            color: ${theme.lightTheme.primary.textcolor};
          }
        }
      }
    }
  }

  .profileRightSide {
    width: 300px;
  }
`

export const AddExperienceButtonStyle = styled.button`
  ${Button}
  color: ${theme.lightTheme.secondary.font};
  box-shadow: none;
  font-weight: 500;
  font-size: 11.6667px;
  line-height: 17px;
  padding: 10px 20px;
  border-radius: 5px;
  ${FlexAlignCenter}
  gap: 10px;
  margin: 0;
`

export const ProfileCardStyle = styled.div`
  background-color: ${theme.lightTheme.seashell};
  border-radius: 8.33333px;
  padding: 20px;
  ${FlexJustifySpaceBetween}
  align-items: center;
  gap: 20px;

  .profileCardHeading {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: ${theme.lightTheme.primary.textcolor};
  }

  .tip {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 8.33333px;
    line-height: 12px;
    color: ${theme.lightTheme.mistBlue};
    margin-bottom: 0;
  }

  .chatRequestsContainer {
    ${FlexAlignCenter}
    gap: 20px;
    margin-top: 20px;

    .chatRequestsPerMonth {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 15px;
      color: ${theme.lightTheme.silverSand};
    }
  }

  ${SmallWeekDayStyle}
`

