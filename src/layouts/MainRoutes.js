import React, { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth";

const MainRoutes = () => {
  const [isUserLogIn, setIsUserLogin] = useState(
    localStorage.getItem("authToken") == null ? false : true
  );
  console.log(isUserLogIn);

  return (
    <Fragment>
      <Routes>
        <Route path="auth/*" element={<Login />} />
      </Routes>
    </Fragment>
  );
};

export default MainRoutes;
