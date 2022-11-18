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

const RightSideWidth = '25%'

export const ProfileStyleContainer = styled.div`
  height: calc(100vh - ${DashboardHeaderHeight});
  background: ${theme.lightTheme.black};
  padding: 25px 50px;
  overflow-y: auto;
  display: flex;
  gap: 30px;

  .profileLeftSide {
    width: calc(100vw - ${RightSideWidth});
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;

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
            border-radius: 50%;
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
              text-transform: capitalize;
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

    .paddingBottom30 {
      padding-bottom: 30px;
    }
  }

  .profileRightSide {
    width: ${RightSideWidth};

    .addTimeContainer {
      margin-top: 220px;

      .timeLabel {
        color: ${theme.lightTheme.primary.textcolor};
        font-size: 16px;
        margin-bottom: 0;
      }

      .availabilityButtonContainer {
        ${FlexJustifyCenter}
        width: 100%;
      }
    }
  }
`

export const AddExperienceButtonStyle = styled.button`
  ${Button}
  color: ${theme.lightTheme.secondary.font};
  box-shadow: none;
  font-weight: 500;
  font-size: 14px;
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

  ${({ column, gap }) => {
    if (column) {
      return { flexDirection: 'column', alignItems: 'start', gap: gap }
    }
  }}

  ${({ block }) => {
    if (block) {
      return { display: 'block' }
    }
  }}

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
    font-size: 10px;
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
      font-size: 12px;
      line-height: 15px;
      color: ${theme.lightTheme.silverSand};
    }
  }

  .viewRow {
    ${FlexJustifySpaceBetween}
    gap: 2rem;
    margin-bottom: 10px;
    background: ${theme.lightTheme.desertStorm};
    border: 0.833333px solid ${theme.lightTheme.greenWhite};
    border-radius: 5px;
    padding: 8px 15px;
    margin: 10px 0;

    .textContainer {
      ${FlexAlignCenter}
      gap: 1rem;
      width: 85%;

      .durationText {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 17px;
        color: ${theme.lightTheme.white};
        margin-bottom: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
      }
    }
  }

  .viewColumn {
    ${FlexAlignCenter}
    gap: 20px;
    margin: 10px 0;
  }

  .width50 {
    width: 50%;
  }

  ${SmallWeekDayStyle}

  .buttonContainer {
    cursor: pointer;
  }
`

export const StyleSingleItem = styled.div`
  ${FlexAlignCenter}
  gap: 20px;
  margin: 10px 0;
  cursor: pointer;

  span {
    color: ${theme.lightTheme.secondary.font};
    font-size: 12px;
    font-family: 'Poppins';
    line-height: 16px;

    ${({ redColor }) => {
      if (redColor) {
        return {
          color: theme.lightTheme.secondary.color
        }
      }
    }};
  }
`

export const AddAvailabilityButtonStyle = styled.button`
  ${Button}
`

export const AddExperienceStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const AddFileStyle = styled.div`
  background: #abe9dc;
  border-radius: 5px;
  color: ${theme.lightTheme.secondary.font};
  box-shadow: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  padding: 10px 20px;
  border-radius: 5px;
  ${FlexAlignCenter}
  gap: 10px;
  margin: 0;
  cursor: pointer;
`

