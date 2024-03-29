import styled from "styled-components";
import { Menu } from "@mui/material";

export const PostStyle = styled.div`
  background: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  .individualPost {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .leftSidePostHeader {
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        height: 35px;
        width: 35px;
        object-fit: cover;
        border-radius: 50%;
      }

      .postNameContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .postName {
          margin-bottom: 0;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 25px;
          color: #262626;
        }

        .postTime {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 500;
          font-size: 11.6667px;
          line-height: 17px;
          color: #696f79;
        }
      }
    }

    .rightSidePostHeader {
      cursor: pointer;
    }
  }

  .postDescription {
    font-family: "Poppins";
    font-style: normal;
    /* font-weight: 500; */
    font-size: 15px;
    line-height: 30px;
    color: #262626;
    padding: 15px 0;
    margin-bottom: 0;
    word-break: break-word;
    overflow: hidden;

    p {
      font-size: 15px;
      margin: 0;
    }
  }

  .mainImageDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(217, 217, 217, 0.5) !important;
    border-radius: 8px;
    margin-top: 10px;

    .postImage {
      width: 100%;
      border-radius: 10px;
    }
  }
`;

export const StylePostMenu = styled(Menu)`
  .MuiMenuItem-root {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #262626;
  }
`;
