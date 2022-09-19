import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth";
import Signup from "../pages/register/signup";

const MainRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="auth/*" element={<Login />} />
        <Route path="register/" element={<Signup />} />
      </Routes>
    </Fragment>
  );
};

export default MainRoutes;
