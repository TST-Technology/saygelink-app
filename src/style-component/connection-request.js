import styled from "styled-components";
import { Button, FlexAlignCenter, FlexJustifySpaceBetween } from "./general";

export const ConnectionRequestStyle = styled.div`
  padding: 10px 20px 30px;
  height: 400px;
  width: 100%;
  overflow-y: auto;

  .connectionRequest {
    margin-top: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #d4d4d4;

    &:last-child {
      border-bottom: none;
    }

    .connectionNameContainer {
      ${FlexAlignCenter};
      gap: 20px;

      .connectionImage {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        object-fit: cover;
      }

      .connectionName {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #262626;
        margin: 0;
      }
    }

    .availabilityContainer {
      .availability {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #acaeb3;
        margin-top: 10px;
        padding: 12px 20px;
        background: #f0f0f0;
        border-radius: 10px;
        ${FlexJustifySpaceBetween}

        .availabilityDay {
          display: inline-block;
          margin: 0 10px 7px 0;
        }

        .availabilityTime {
        }

        .availabilityTimezone {
          margin: 0;
        }

        .connectionAction {
          ${FlexAlignCenter};
          gap: 20px;
        }
      }
    }
  }
`;

export const DeclineButtonStyle = styled.button`
  ${Button}
  margin: 0;
  border: 1px solid rgba(238, 187, 200, 0.99);
  border-radius: 6px;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ce8686;
  box-shadow: none;
  background: transparent;
  height: fit-content;

  &:hover {
    box-shadow: none;
  }
`;

export const AcceptButtonStyle = styled.button`
  ${Button}
  margin: 0;
  background: #4d85eb;
  border: 1px solid #4d85eb;
  border-radius: 6px;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #f0f0f0;
  box-shadow: none;
  height: fit-content;

  &:hover {
    box-shadow: none;
  }
`;
