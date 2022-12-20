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

export const MemberContainerStyle = styled.div`
  height: calc(100vh - ${DashboardHeaderHeight});
  display: flex;
  gap: 40px;
  padding: 50px;
  overflow: auto;

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

        .nameRoleContainer {
          ${FlexJustifyCenter};
          gap: 10px;
          flex-direction: column;

          h3 {
            color: #262626;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 26px;
          }

          span {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 18px;
            color: rgba(38, 38, 38, 0.3);
          }
        }
      }

      .otherFieldsContainer {
        margin-top: 20px;
        ${FlexJustifySpaceBetween};

        .otherField {
          ${FlexCenter};
          flex-direction: column;
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
            font-size: 20px;
            line-height: 30px;
            color: #7c7575;
          }
        }
      }

      .timingContainer {
        margin-top: 20px;
        background: #f0f0f0;
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

  .rightSideMemberSection {
    width: calc(100% - ${ProfileWidth});
    height: 100%;

    .insightContainer {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    .bioDetail {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #262626;
    }

    .memberButtonContainer {
      display: flex;
      gap: 20px;
      margin-top: 30px;
    }
  }

  .memberSectionHeading {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #5c5353;
  }
`

export const StyleCategoryCard = styled.div`
width: 33%;
    ${FlexAlignCenter};
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
