import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/general/header'
import ProtectedRoute from '../components/protected-route/protected-route'
import { UserContext } from '../context/user'
import Login from '../pages/auth'
import Calender from '../pages/calender/calender'
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
import { getEmail, getToken } from '../utils/funcs'

const MainRoutes = () => {
  const [includeHeader, setIncludeHeader] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setIncludeHeader(HEADER_VISIBLE_ROUTES.includes(window.location.pathname))
  }, [window.location.pathname])

  const HEADER_VISIBLE_ROUTES = [
    ROUTES.HEALTHCARE,
    ROUTES.MESSAGE,
    ROUTES.HOME,
    ROUTES.PROFILE,
    ROUTES.NETWORK,
    ROUTES.CALENDER
  ]

  const token = getToken()
  const email = getEmail()

  return (
    <UserContext.Provider value={{ setUser: setUser, user: user }}>
      <DashboardContainerStyle includeHeader={includeHeader}>
        {includeHeader ? <Header /> : null}
        <Fragment>
          <Routes>
            <Route
              element={
                <ProtectedRoute
                  redirectTo={ROUTES.HOME}
                  condition={token && email}
                />
              }
            >
              <Route path='auth/*' element={<Login />} />
              <Route path='register' element={<Signup />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  redirectTo={ROUTES.AUTH}
                  condition={!token || !email}
                />
              }
            >
              <Route path='welcome' element={<Welcome />} />
              <Route path='create-account' element={<CreateAccount />} />
              <Route path={ROUTES.HEALTHCARE} element={<Healthcare />} />

              <Route path={ROUTES.NETWORK} element={<Network />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.HOME} element={<Dashboard />} />
              <Route path={ROUTES.MESSAGE} element={<Message />} />
              <Route path={ROUTES.CALENDER} element={<Calender />} />
            </Route>
          </Routes>
        </Fragment>
      </DashboardContainerStyle>
    </UserContext.Provider>
  )
}

export default MainRoutes
