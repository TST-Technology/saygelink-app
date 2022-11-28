import styled from 'styled-components'
import { Menu } from '@mui/material'

export const PostStyle = styled.div`
  .individualPost {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

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
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 25px;
          color: #262626;
        }

        .postTime {
          font-family: 'Poppins';
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
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 30px;
    color: #262626;
    padding: 15px 0;
    margin-bottom: 0;
    border-bottom: 0.833333px solid rgba(38, 38, 38, 0.08);
    word-break: break-word;
  }
`

export const StylePostMenu = styled(Menu)`
  .MuiMenuItem-root {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #262626;
  }
`
