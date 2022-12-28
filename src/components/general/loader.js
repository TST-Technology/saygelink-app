import { CircularProgress } from '@mui/material'
import React from 'react'
import { LoaderContainer, LoaderStyle } from '../../style-component/loader'

const Loader = ({ height }) => {
  return (
    <LoaderContainer height={height}>
      <LoaderStyle />
    </LoaderContainer>
  )
}

export default Loader
