import styled from 'styled-components'
import theme from '../../utils/variables'

export const StyleWeekdayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`

export const StyleCard = styled.div`
  background: ${theme.lightTheme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 80px;
  width: 80px;
  border-radius: 50%;

  ${(props) => {
    if (props.added) {
      return {
        background: theme.lightTheme.primary.color
      }
    }
  }}

  ${(props) => {
    if (props.selected) {
      return {
        background: 'rgba(250, 47, 102, 0.2)'
      }
    }
  }}

  .weekdayText {
    font-family: Poppins;
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 0;
  }
`
