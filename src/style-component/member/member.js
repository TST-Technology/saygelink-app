import styled from 'styled-components'
import { DashboardHeaderHeight } from '../../utils/constants'
import theme from '../../utils/variables'
import {
  Button,
  FlexAlignCenter,
  FlexCenter,
  FlexJustifyCenter,
  FlexJustifySpaceBetween
} from '../general'

const ProfileWidth = '400px'
const TopSectionHeight = '160px'

export const MemberContainerStyle = styled.div`
  height: calc(100vh - ${DashboardHeaderHeight});
  padding: 20px 80px 0 80px;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .profileTopSection {
    ${FlexJustifySpaceBetween};
    gap: 30px;
    height: ${TopSectionHeight};

    .profileTopLeftSection {
      display: flex;
      gap: 20px;

      .profileImageContainer {
        .profileMemberImage {
          height: 160px;
          width: 160px;
          object-fit: cover;
          border-radius: 20px;
        }
      }

      .profileLeftDetailContainer {
        ${FlexJustifySpaceBetween};
        flex-direction: column;
        gap: 30px;

        .nameRoleContainer {
          h3 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 32px;
            line-height: 48px;
            color: #262626;
          }

          span {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: rgba(38, 38, 38, 0.3);
          }
        }

        .otherFieldsContainer {
          margin-top: 20px;
          ${FlexJustifySpaceBetween};
          gap: 40px;

          .otherField {
            ${FlexCenter};
            gap: 10px;

            .title {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 600;
              font-size: 24px;
              line-height: 36px;
              color: #000000;
            }

            .value {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 500;
              font-size: 16px;
              line-height: 24px;
              color: #939393;
              margin-bottom: 0;
            }
          }
        }
      }
    }

    .profileTopRightSection {
      ${FlexAlignCenter};

      .profileButtonContainer {
        ${FlexAlignCenter};
        flex-direction: column;
        gap: 20px;
      }
    }
  }

  .profileBottomSection {
    padding: 40px;
    margin-top: 40px;
    background: #f8f8f8;
    border-radius: 20px 20px 0px 0px;
    display: flex;
    gap: 50px;
    height: calc(100% - ${TopSectionHeight});

    > div {
      width: 33%;
      height: 100%;

      .section {
        margin-bottom: 40px;
      }

      .memberSectionHeading {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: #5c5353;
        margin-bottom: 20px;
      }

      .bioDetail {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: #262626;
      }

      .insightContainer {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
      }

      .timingContainer {
        margin-top: 20px;
        background: #ffffff;
        border: 1px solid #e8e8e8;
        border-radius: 10px;
        padding: 0 20px;

        .timing {
          ${FlexJustifySpaceBetween};
          gap: 20px;
          padding: 20px 0;
          border-bottom: 0.5px solid #aeaeae;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  .leftSideMemberSection {
    width: ${ProfileWidth};
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .profileDetail {
      background: #f5f5f5;
      border-radius: 20px;
      padding: 40px;

      .nameContainer {
        display: flex;
        gap: 20px;

        .profileMemberImage {
          height: 90px;
          width: 90px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
  }

  .rightSideMemberSection {
    width: calc(100% - ${ProfileWidth});
    height: 100%;
  }

  .socialProfileContainer {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    .socialImage {
      height: 28.95px;
      width: 28.95px;
    }
  }
`

export const StyleCategoryCard = styled.div`
  width: 100%;    ${FlexAlignCenter};
  gap: 20px;
  background: #fefefe;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  height: 72px;
  padding: 15px;
  margin-bottom: 20px;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  .label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: color: #696F79;
    margin-bottom: 0;
    text-transform: capitalize;
  }

  .imageContainer {
    .categoryImage {
      object-fit: cover;
      height: 50px;
      width: 50px;
    }
  }
`

export const ScheduleCallButtonStyle = styled.button`
  ${Button}
  color: ${theme.lightTheme.black};
  background: #1186ef;
  border-radius: 5px;
  box-shadow: none;
  margin: 0;
  display: flex;
  gap: 10px;
  padding: 10px 40px;
`

export const SendMessageButtonStyle = styled.button`
  ${Button}
  color: #1186EF;
  background: white;
  border-radius: 5px;
  box-shadow: none;
  margin: 0;
  display: flex;
  gap: 10px;
  padding: 10px 42px;
  border: 1px solid #1186ef;
`
