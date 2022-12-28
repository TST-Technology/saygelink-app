import styled from 'styled-components'
import theme from '../../utils/variables'
import { DropdownStyle, InputStyle } from '../general'

export const StyleTimePickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .minHourContainer {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .divider {
      color: ${theme.lightTheme.secondary.font};
    }
  }
`

export const StyledHourMinuteInput = styled.input`
  ${InputStyle}
  color: ${theme.lightTheme.secondary.font};
  width: 60px;
  font-size: 20px;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  -moz-appearance: textfield;

  ${({ backgroundColor }) => {
    if (backgroundColor) {
      return {
        backgroundColor: backgroundColor
      }
    }
  }}
`

export const StyleTimeDropdown = styled.select`
  ${DropdownStyle}
  width: fit-content;

  ${({ backgroundColor }) => {
    if (backgroundColor) {
      return {
        backgroundColor: backgroundColor
      }
    }
  }}
`
