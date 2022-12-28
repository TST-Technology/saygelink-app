import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import theme from '../utils/variables'

export const DeleteConfirmStyle = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 30px;
  }
  .MuiDialogTitle-root {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: ${theme.lightTheme.primary.textcolor};
  }

  .MuiButton-text {
    color: #f62e5f;

    &:first-child {
      color: #535353;
    }
  }
`
