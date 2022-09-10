import React from "react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Body from "../components/general/Body";
import MainRoutes from "./MainRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <Fragment>
      {/* Toast Container */}
      <ToastContainer />
      <Body>
        <MainRoutes />
      </Body>
    </Fragment>
  );
};

export default React.memo(Layout);
