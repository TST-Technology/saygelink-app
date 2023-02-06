import styled from 'styled-components'
import { devices } from '../../utils/constants'

export const VerticalTabContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  @media ${devices.tablet} {
    flex-direction: row;
    justify-content: space-between;
    background: transparent;
  }
`

export const VerticalTabStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 20px;
  border-radius: 8.33333px 8.33333px 0px 0px;
  cursor: pointer;
  @media ${devices.tablet} {
    border-radius: 8px;
  }


  ${(props) => {
    if (props.activeTab) {
      return {
        background: '#ABE9DE'
      }
    }
    else{
      return{
        background: '#f8f8f8'
      }
    }
  }}

  h3 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    color: #000000;
    margin-bottom: 0;
  }
`
