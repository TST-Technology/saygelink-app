import styled from 'styled-components'
import theme from '../../utils/variables'
import {
  Button,
  DropdownStyle,
  InputStyle,
  SmallWeekDayStyle,
  TextAreaStyle
} from '../general'

export const ScheduleMeetingStyle = styled.div`
  padding: 20px;
  height: calc(100vh - 250px);
  overflow-y: auto;

  .profileContainer {
    display: flex;
    gap: 20px;

    .profileImage {
      height: 90px;
      width: 90px;
    }

    .rightTextContainer {
      display: flex;
      flex-direction: column;
      gap: 10px;

      h2 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 26px;
        line-height: 39px;
        /* identical to box height */
        color: ${theme.lightTheme.primary.textcolor};
      }

      p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: rgba(38, 38, 38, 0.3);
        margin-bottom: 0;
      }
    }
  }

  .cardMeeting {
    background: ${theme.lightTheme.desertStorm};
    border-radius: 10px;
    padding: 15px;
    margin-top: 25px;

    .heading {
      color: ${theme.lightTheme.primary.textcolor};
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 36px;
    }

    .cardCol2 {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;

      > input {
        width: 50%;
      }
    }
  }

  ${SmallWeekDayStyle}

  .timeContainer {
    display: flex;
    gap: 20px;
    margin-top: 30px;

    .textText {
      width: 50%;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000;
      padding: 10px 20px;
      background: #ffffff;
      border-radius: 6px;
    }
  }
`

export const MessageTextAreaStyle = styled.textarea`
  ${TextAreaStyle}
  height: 89px;
  padding: 4px 18px;
  width: 100%;

  &::placeholder {
    color: ${theme.lightTheme.quillGrey};
  }
`

export const TimezoneDropdownStyle = styled.select`
  ${DropdownStyle}
  width: 100%;
`

export const DateInputStyle = styled.input`
  ${InputStyle}
`

export const SubmitButtonStyle = styled.button`
  ${Button}
  background: #4D85EB;
  border-radius: 9px;
  color: white;
  width: 100%;
`
