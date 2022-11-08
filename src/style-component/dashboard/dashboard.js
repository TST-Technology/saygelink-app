import styled from 'styled-components'

export const DashboardContainerStyle = styled.div`
  ${(props) => {
    if (props.includeHeader) {
      return {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }}
`
