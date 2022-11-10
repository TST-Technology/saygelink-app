import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import {
  DropdownStyle,
  FlexAlignCenter,
  FlexJustifyCenter,
  FlexJustifySpaceBetween,
  InputStyle
} from '../general'
import theme from '../../utils/variables'

export const EditProfileDialogStyle = styled(Dialog)`
  .MuiPaper-root {
    max-width: 100%;
    border-radius: 30px;
  }

  .dialog {
    width: 70vw;
    padding: 30px;

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
    }

    .dialogBody {
      width: 90%;
      margin: 0 auto;
      margin-top: 30px;
      ${FlexAlignCenter};
      flex-direction: column;
      gap: 30px;

      .profileImage {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }

      .row2 {
        ${FlexAlignCenter}
        gap: 20px;
        width: 100%;

        > div {
          width: 50%;
        }
      }
    }
  }
`

export const DialogInputStyle = styled.input`
  ${InputStyle}
  width: 100%;
  border: 1px solid ${theme.lightTheme.ternory.font};

  border-radius: 15px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: ${theme.lightTheme.primary.textcolor};
  padding: 10px 18px;
`

export const DialogDropdownStyle = styled.select`
  ${DropdownStyle}
  width: 100%;
  border: 1px solid ${theme.lightTheme.ternory.font};

  border-radius: 15px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: ${theme.lightTheme.primary.textcolor};
  padding: 10px 18px;
`
