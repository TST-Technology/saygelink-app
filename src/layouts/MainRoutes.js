import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth";
import CreateAccount from "../pages/createAccount/create-account";
import Signup from "../pages/register/signup";
import Welcome from "../pages/welcome/welcomepage";

const MainRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="auth/*" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="create-account" element={<CreateAccount />} />
      </Routes>
    </Fragment>
  );
};

export default MainRoutes;
