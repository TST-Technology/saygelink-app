import styled from 'styled-components'
import theme from '../../utils/variables'

export const StyleWeekdayContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`

export const StyleCard = styled.div`
  background: ${(props) =>
    props.selected ? 'rgba(250, 47, 102, 0.2)' : theme.lightTheme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 80px;
  width: 80px;
  border-radius: 50%;

  .weekdayText {
    font-family: Poppins;
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 0;
  }
`
