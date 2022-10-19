import styled from 'styled-components'
import { devices } from '../../utils/constants'
import theme from '../../utils/variables'
import { Button } from '../general'

export const StyleInputButton = styled.div`
  display: flex;
  background: ${theme.lightTheme.desertStorm};
  border: 1px solid ${theme.lightTheme.greenWhite};
  border-radius: 6px;
  height: 38px;
  width: fit-content;

  .button {
    color: ${theme.lightTheme.secondary.font};
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 2rem;
    text-decoration: none;
    font-size: 18px;
  }
`

export const StyleInput = styled.input`
  background: ${theme.lightTheme.desertStorm};
  outline: none;
  border: none;
  width: 50px;
  padding-left: 20px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  -moz-appearance: textfield;
`

export const StyleInputButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  .requestsPerMonthText {
    color: ${theme.lightTheme.mistBlue};
    font-family: Poppins;
    font-size: 18px;
    font-weight: 400;
  }
`

export const StyleDayTimeContainer = styled.div`
  margin-top: 5rem;

  .dayTimeContainer {
    margin-top: 2rem;
  }

  .dayTimeText {
    color: ${theme.lightTheme.secondary.font};
    font-family: Poppins;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
  }

  .timePickerContainer {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 3rem;

    @media ${devices.tablet} {
      justify-content: flex-start;
    }

    .startTimeContainer,
    .endTimeContainer {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .timeLabel {
        color: ${theme.lightTheme.grey};
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
`

export const StyleAddIntervalButton = styled.button`
  ${Button}
  margin: 0;
`

export const StyleMarginTop = styled.div`
  margin-top: 2rem;
`
