import styled from 'styled-components'

export const ImageCardStyle = styled.div`
  .cardBody {
    margin-top: 15px;

    .cardImage {
      padding: 20px 0;
      background-size: auto;
      background-repeat: round;
      display: flex;
      flex-direction: column;
      justify-content: center;

      ${({ bgImage }) => {
        if (bgImage) {
          return { backgroundImage: `url(${bgImage})` }
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
      }
    }

    .cardImageText {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 16.6667px;
      line-height: 25px;
      text-align: center;
      color: #ffffff;
    }
  }

  .cardHeading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    ${({ showBorder }) => {
      if (showBorder) {
        return { borderBottom: `0.833333px solid rgba(38, 38, 38, 0.1)` }
      }
    }}

    p {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 16.6667px;
      color: #262626;
      margin-bottom: 0;
    }

    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 13.3333px;
      line-height: 16px;
      color: #f62e5f;
    }
  }
`
