import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from '../components/general/header'
import ProtectedRoute from '../components/protected-route/protected-route'
import { UserContext } from '../context/user'
import useHttp from '../hooks/use-http'
import Login from '../pages/auth'
import Calender from '../pages/calender/calender'
import Category from '../pages/category/category'
import CreateAccount from '../pages/createAccount/create-account'
import Dashboard from '../pages/dashboard/dashboard'
import Healthcare from '../pages/healthcare/healthcare'
import Message from '../pages/message/message'
import Network from '../pages/network/network'
import Profile from '../pages/profile/profile'
import Signup from '../pages/register/signup'
import Welcome from '../pages/welcome/welcomepage'
import { DashboardContainerStyle } from '../style-component/dashboard/dashboard'
import CONSTANT, { ROUTES } from '../utils/constants'
import { getEmail, getToken } from '../utils/funcs'

const MainRoutes = () => {
  const profileApi = useHttp()
  const [includeHeader, setIncludeHeader] = useState(false)
  const [user, setUser] = useState(null)
  const [profileDetail, setProfileDetail] = useState(null)
  const location = useLocation()

  const token = getToken()
  const email = getEmail()

  useEffect(() => {
    if (email && !profileDetail) {
      getProfileDetail()
    }
  }, [email])

  useEffect(() => {
    setIncludeHeader(HEADER_VISIBLE_ROUTES.includes(location.pathname))
  }, [location])

  const getProfileDetail = () => {
    const url = {
      ...CONSTANT.API.getProfileDetail,
      endpoint: CONSTANT.API.getProfileDetail.endpoint.replace(':email', email)
    }
    profileApi.sendRequest(url, responseHandler)
  }

  const responseHandler = (res) => {
    if (res?.userInfo) {
      setProfileDetail({ ...res?.userInfo })
    }
  }

  const HEADER_VISIBLE_ROUTES = [
    ROUTES.HEALTHCARE,
    ROUTES.MESSAGE,
    ROUTES.HOME,
    ROUTES.PROFILE,
    ROUTES.NETWORK,
    ROUTES.CALENDER,
    ROUTES.CATEGORY
  ]

  return (
    <UserContext.Provider
      value={{
        setUser: setUser,
        user: user,
        profileDetail: profileDetail,
        setProfileDetail: setProfileDetail
      }}
    >
      <DashboardContainerStyle includeHeader={includeHeader}>
        {includeHeader ? <Header /> : null}
        <Fragment>
          <Routes>
            <Route
              element={
                <ProtectedRoute
                  redirectTo={ROUTES.HOME}
                  condition={getToken() && getEmail()}
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
                  condition={!getToken() || !getEmail()}
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
              <Route path={ROUTES.CATEGORY} element={<Category />} />
            </Route>
          </Routes>
        </Fragment>
      </DashboardContainerStyle>
    </UserContext.Provider>
  )
}

export default MainRoutes
