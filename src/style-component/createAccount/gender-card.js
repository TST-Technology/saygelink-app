import styled from 'styled-components'
import theme from '../../utils/variables'

export const StyleCard = styled.div`
  background: ${(props) =>
    props.selected
      ? theme.lightTheme.primary.color
      : theme.lightTheme.alabaster};
  border: 1px solid ${theme.lightTheme.greenWhite};
  cursor: pointer;
  position: relative;
  min-height: 110px;
  min-width: 170px;
  padding: 10px 10px 20px 10px;
  border-radius: 10px;
`

export const StyleCardIcon = styled.div`
  position: absolute;
  right: -6px;
  bottom: 5px;

  img {
    width: 38px;
    height: 64px;
  }
`

export const StyleText = styled.span`
  color: ${theme.lightTheme.secondary.font};
  font-size: 20px;
  font-weight: 600;
  line-height: 39px;
`

export const StyleGenderContainer = styled.div`
  display: flex;
  gap: 2rem;
`
