import React from 'react'
import Header from '../../components/general/header'
import { DashboardContainerStyle } from '../../style-component/dashboard/dashboard'
import Message from '../message/message'

const Dashboard = () => {
  return (
    <DashboardContainerStyle>
      <Header />
      <Message />
    </DashboardContainerStyle>
  )
}

export default Dashboard
