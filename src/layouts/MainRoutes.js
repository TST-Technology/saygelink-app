import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Header from '../components/general/header'
import Login from '../pages/auth'
import CreateAccount from '../pages/createAccount/create-account'
import Dashboard from '../pages/dashboard/dashboard'
import Healthcare from '../pages/healthcare/healthcare'
import Message from '../pages/message/message'
import Network from '../pages/network/network'
import Profile from '../pages/profile/profile'
import Signup from '../pages/register/signup'
import Welcome from '../pages/welcome/welcomepage'
import { DashboardContainerStyle } from '../style-component/dashboard/dashboard'
import { ROUTES } from '../utils/constants'

const MainRoutes = () => {
  const HEADER_VISIBLE_ROUTES = [
    ROUTES.HEALTHCARE,
    ROUTES.MESSAGE,
    ROUTES.HOME,
    ROUTES.PROFILE,
    ROUTES.NETWORK
  ]

  const includeHeader = HEADER_VISIBLE_ROUTES.includes(window.location.pathname)

  return (
    <DashboardContainerStyle includeHeader={includeHeader}>
      {includeHeader ? <Header /> : null}
      <Fragment>
        <Routes>
          <Route path='auth/*' element={<Login />} />
          <Route path='register' element={<Signup />} />
          <Route path='welcome' element={<Welcome />} />
          <Route path='create-account' element={<CreateAccount />} />
          <Route path={ROUTES.HEALTHCARE} element={<Healthcare />} />

          <Route path={ROUTES.NETWORK} element={<Network />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.HOME} element={<Dashboard />} />
          <Route path={ROUTES.MESSAGE} element={<Message />} />
        </Routes>
      </Fragment>
    </DashboardContainerStyle>
  )
}

export default MainRoutes;
