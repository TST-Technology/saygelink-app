import styled from "styled-components";
import theme from "../../utils/variables";

export const StyledExperienceContainer = styled.div`
  display: flex;
  gap: 2rem;

  .categoryContainer {
    display: flex;
    flex-wrap: wrap;
    // width: 40%;
    gap: 2rem;
  }

  .subCategoryContainer,
  .topicContainer {
    width: 30%;

    .subCategoryHeading {
      color: #212940;
      font-weight: 500;
    }
  }
`;

export const StyleSubcategoryItem = styled.div`
  background: ${(props) =>
    props.selected ? theme.lightTheme.primary.color : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 7px 10px;
  gap: 2rem;

  ${(props) => {
    if (props.border) {
      return {
        borderTop: `1px solid ${theme.lightTheme.pastelGrey}`,
      };
    }
  }}

  p{
    color: ${theme.lightTheme.primary.textcolor}
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 27px;
    margin-bottom: 0;
  }
`;

export const StyleTopicItem = styled.div`
  background: ${(props) =>
    props.selected ? theme.lightTheme.primary.color : "transparent"};
  cursor: pointer;
  padding: 7px 10px;

  ${(props) => {
    if (props.border) {
      return {
        borderTop: `1px solid ${theme.lightTheme.pastelGrey}`,
      };
    }
  }}

  p{
    color: ${theme.lightTheme.primary.textcolor}
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 27px;
    margin-bottom: 0;
  }
`;

export const StyleCategoryCard = styled.div`
  box-shadow: rgb(188 187 187 / 37%) 1px 5.50327px 14px;
  // box-shadow: 0px 5.50327px 5.50327px rgba(0, 0, 0, 0.25);
  background: #fff;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 11px;
  width: 150px;

  ${(props) => {
    if (props.selected) {
      return {
        border: `3px solid ${theme.lightTheme.primary.color}`,
      };
    }
  }}

  .imageContainer {
    border-radius: 11.0065px 11.0065px 0px 0px;

    img {
      object-fit: cover;
      border-radius: 11.0065px 11.0065px 0px 0px;
      height: 125px;
      width: 150px;
    }
  }

  .labelContainer {
    text-align: center;
    border-radius: 0px 0px 11.0065px 11.0065px;
    margin: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .label {
      color: ${theme.lightTheme.secondary.font};
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
    }
  }
`;

export const StyleCompleteProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(85vh - 10rem);

  .peopleImage {
    height: 350px;
    width: 400px;
    object-fit: cover;
  }
`;
