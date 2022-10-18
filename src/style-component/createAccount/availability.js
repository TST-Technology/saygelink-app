import styled from 'styled-components'
import theme from '../../utils/variables'

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
`
