import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Body from "../components/general/Body";
import MainRoutes from "./MainRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Mobile from "../pages/Mobile";

const Layout = () => {
  let deviceType = false


  var w = document.documentElement.clientWidth;

  if (w < 500) {
    deviceType = true;
  } else {
    deviceType = false;
  }


  console.log(deviceType);
  return !deviceType ? (
    <Fragment>
      <ToastContainer />
      <Body>
        <MainRoutes />
      </Body>
    </Fragment>
  ) : (
    <>
      <Mobile />
    </>
  );
};

export default React.memo(Layout);
