import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth";
import CreateAccount from "../pages/createAccount/create-account";
import Dashboard from '../pages/dashboard/dashboard'
import Healthcare from '../pages/healthcare/healthcare'
import Signup from '../pages/register/signup'
import Welcome from '../pages/welcome/welcomepage'
import { ROUTES } from '../utils/constants'

const MainRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='auth/*' element={<Login />} />
        <Route path='register' element={<Signup />} />
        <Route path='welcome' element={<Welcome />} />
        <Route path='create-account' element={<CreateAccount />} />
        <Route path={ROUTES.HEALTHCARE} element={<Healthcare />} />

        <Route path={ROUTES.HOME} element={<Dashboard />} />
      </Routes>
    </Fragment>
  )
}

export default MainRoutes;
