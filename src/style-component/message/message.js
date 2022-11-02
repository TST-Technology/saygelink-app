import styled from 'styled-components'
import theme from '../../utils/variables'

export const MessageContainerStyle = styled.div`
  background: ${theme.lightTheme.quillGrey};
  height: calc(100vh - 70px);

  .messageContainer {
    background: ${theme.lightTheme.desertStorm};
    display: flex;
    margin: 20px auto 40px auto;
    width: 85%;
    height: calc(100% - 60px);
    border-radius: 8.33333px;

    .leftSection {
      background: ${theme.lightTheme.seashell};
      width: 370px;
      height: 100%;
      border-right: 3px solid rgba(204, 204, 204, 0.25);

      .membersHeadingContainer {
        display: flex;
        align-items: center;
        height: 70px;
        border-bottom: 0.833333px solid rgba(38, 38, 38, 0.2);

        .membersHeading {
          color: ${theme.lightTheme.primary.textcolor};
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          margin-left: 20px;
          margin-bottom: 0;
        }
      }
    }

    .rightSection {
      background: ${theme.lightTheme.seashell};
      width: calc(100% - 370px);
      height: 100%;
    }
  }
`
