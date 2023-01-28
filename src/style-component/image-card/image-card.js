import styled from "styled-components";

export const ImageCardStyle = styled.div`
  .cardBody {
    margin-top: 15px;

    .cardImage {
      padding: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 180px !important;
      border-radius: 6.64px;
      cursor: pointer;

      ${({ bgImage }) => {
        if (bgImage) {
          return { backgroundImage: `url(${bgImage})` };
        }
      }}

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
        cursor: pointer;

        &.notABlueButton {
          border: none;
          color: #f62e5f;
          font-weight: 700;
          font-size: 12px;
          line-height: 18px;
          padding: 7px 25px;
          border-radius: 6px;
        }
      }
    }

    .cardImageText {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 16.6667px;
      line-height: 25px;
      text-align: center;
      color: #ffffff;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  .cardHeading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    ${({ showBorder }) => {
      if (showBorder) {
        return { borderBottom: `0.833333px solid rgba(38, 38, 38, 0.1)` };
      }
    }}

    p {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 16.6667px;
      color: #262626;
      margin-bottom: 0;
    }

    span {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 13.3333px;
      line-height: 16px;
      color: #f62e5f;
      cursor: pointer;
    }
  }
`;
export const ImageCardStyleNew = styled.div`
  .cardBody {
    margin-top: 15px;
    .cardImage {
      padding: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 135px;
      border-radius: 6.64px;

      ${({ bgImage }) => {
        if (bgImage) {
          return { backgroundImage: `url(${bgImage})` };
        }
      }}

      a {
        text-decoration: none;
        text-align: center;
        width: fit-content;
        margin: 0 auto;
        background: #fafafa;
        border: none;
        border-radius: 7.5px;
        padding: 5px 23px;
        color: #000;
        cursor: pointer;
        font-weight: 700;
        font-size: 15px;

        &.notABlueButton {
          border: none;
          color: #f62e5f;
          font-weight: 700;
          font-size: 12px;
          line-height: 18px;
          padding: 7px 25px;
          border-radius: 6px;
        }
      }
    }

    .cardImageText {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 16.6667px;
      line-height: 25px;
      text-align: center;
      color: #ffffff;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
`;
