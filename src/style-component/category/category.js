import styled from 'styled-components'
import { DashboardHeaderHeight } from '../../utils/constants'

export const StyleCategoryContainer = styled.div`
  height: calc(100vh - ${DashboardHeaderHeight});
  background: white;

  .heading {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #5c5353;
  }

  .subHeading {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #696f79;
  }

  .categoryPageContainer {
    display: flex;
    height: 100%;
    padding: 50px 30px 30px;
    gap: 30px;

    .categorySection {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: 100%;
      overflow: scroll;
      border-right: 1px solid #e5e5e5;
    }

    .topicSection {
      display: flex;
      flex-direction: column;
      flex-grow: 3;

      .topicSectionContainer {
        display: flex;
        height: 100%;

        > div {
          width: 50%;
        }

        .subCategorySection {
          border-right: 1px solid #e5e5e5;
        }
      }
    }
  }
`
