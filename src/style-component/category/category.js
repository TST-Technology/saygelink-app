import styled, { css } from "styled-components";
import { DashboardHeaderHeight } from "../../utils/constants";
import theme from "../../utils/variables";
import { FlexAlignCenter, FlexJustifySpaceBetween } from "../general";

export const StyleCategoryContainer = styled.div`
  height: calc(100vh - ${DashboardHeaderHeight});
  background: white;

  .heading {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #5c5353;
  }

  .subHeading {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
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
      padding-right: 30px;
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
          padding-right: 30px;
        }

        .topicSection {
          padding-left: 30px;
        }
      }
    }
  }

  .findASaygeButtonContainer {
    position: absolute;
    right: 50px;
    bottom: 50px;
  }
`;

export const CommonCardStyle = css`
  ${FlexAlignCenter};
  gap: 20px;
  background: #fefefe;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  height: 72px;
  cursor: pointer;
  padding: 15px;
  margin-bottom: 20px;

  ${(props) => {
    if (props.selected) {
      return {
        borderColor: "#abe9dc",
        background: "rgba(171, 233, 220, 0.2)",
      };
    }
  }}

  .label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: color: #696F79;
    margin-bottom: 0;
    text-transform: capitalize;

    ${(props) => {
      if (props.selected) {
        return {
          color: "#5C5353",
          fontWeight: 600,
        };
      }
    }}
  }
`;

export const StyleCategoryCard = styled.div`
  ${CommonCardStyle};

  .imageContainer {
    .categoryImage {
      object-fit: cover;
      height: 50px;
      width: 50px;
      border-radius: 8px;
    }
  }
`;

export const StyleSubcategoryTopicItem = styled.div`
  ${CommonCardStyle};
  min-height: 52px;
  ${FlexJustifySpaceBetween};

  ${(props) => {
    if (props.isFindSayge && props.selected) {
      return {
        borderColor: "",
        background: "#F62E5F",
      };
    }
  }}

  .label {
    ${(props) => {
      if (props.isFindSayge && props.selected) {
        return {
          color: "white",
        };
      }
    }}
  }
`;
