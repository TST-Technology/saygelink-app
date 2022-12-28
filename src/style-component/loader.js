import styled from 'styled-components'
import { CircularProgress } from '@mui/material'
import { FlexCenter } from './general'

export const LoaderContainer = styled.div`
  ${FlexCenter}
  width: 100%;
  ${({ height }) => {
    return { height: height }
  }}
`

export const LoaderStyle = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    color: #1186ef;
  }
`
