import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import { FlexJustifySpaceBetween } from './general'
import theme from '../utils/variables'

export const DialogStyle = styled(Dialog)`
  .MuiPaper-root {
    max-width: 100%;
    border-radius: 30px;
  }

  .dialog {
    width: 70vw;
    padding: 30px 30px 60px;
    ${({ width }) => {
      return { width: width }
    }}

    .dialogHeader {
      ${FlexJustifySpaceBetween}

      .dialogHeadingLeft {
        width: 100%;
      }

      .dialogTitle {
        width: fit-content;
        margin: 0 auto;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        color: ${theme.lightTheme.secondary.font};
      }

      .closeIcon {
        cursor: pointer;
      }
    }

    .dialogBody {
      width: 90%;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
`
