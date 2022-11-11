import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import {
  Button,
  DropdownStyle,
  FlexAlignCenter,
  FlexCenter,
  FlexJustifyCenter,
  FlexJustifySpaceBetween,
  InputStyle
} from '../general'
import theme, { UNIVERSITY_COLOR } from '../../utils/variables'

export const EditProfileDialogStyle = styled(Dialog)`
  .MuiPaper-root {
    max-width: 100%;
    border-radius: 30px;
  }

  .dialog {
    width: 70vw;
    padding: 30px 30px 60px;

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
  height: auto;

  border-radius: 15px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: ${theme.lightTheme.primary.textcolor};
  padding: 10px 18px;

  &::placeholder {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: ${theme.lightTheme.quillGrey};
  }
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

export const GenderCardStyle = styled.div`
  ${FlexCenter}
  background-color: ${theme.lightTheme.seashell};
  flex-grow: 1;
  min-height: 55px;
  cursor: pointer;
  ${({ first }) => {
    if (first) {
      return {
        borderRadius: '12px 0 0 12px'
      }
    }
  }}
  ${({ last }) => {
    if (last) {
      return {
        borderRadius: '0 12px 12px 0'
      }
    }
  }}
    ${({ selected }) => {
    if (selected) {
      return {
        background: UNIVERSITY_COLOR.primary
      }
    }
  }}
    span {
    color: ${theme.lightTheme.ternory.font};
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    ${({ selected }) => {
      if (selected) {
        return {
          color: theme.lightTheme.black
        }
      }
    }};
  }
`

export const GenderContainerStyle = styled.div`
  display: flex;
  border-radius: 12px;
  width: 100%;
`

export const UploadContainerStyle = styled.div`
  border: 1px solid ${theme.lightTheme.ternory.font};
  width: 100%;
  min-height: 55px;
  border-radius: 15px;
  position: relative;
  ${FlexAlignCenter}
  padding: 0 20px;

  .uploadFile {
    position: absolute;
    right: 20px;
    top: 15px;
    transform: rotate(-90deg);
  }

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: ${theme.lightTheme.quillGrey};
  }
`

export const SaveChangesButtonStyle = styled.button`
  ${Button}
  width: 100%;
  margin: 0;
  box-shadow: none;
  background: ${UNIVERSITY_COLOR.primary};
  color: ${theme.lightTheme.black};
`