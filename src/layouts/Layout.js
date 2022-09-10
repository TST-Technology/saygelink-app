import React from "react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Body from "../components/general/Body";
import MainRoutes from "./MainRoutes";

const Layout = () => {
  return (
    <Fragment>
      {/* Toast Container */}
      <ToastContainer />
      {/* Boady Braper */}
      <Body>
        {/* Header */}
        <MainRoutes />
        {/* Footer */}
      </Body>
    </Fragment>
  );
};

export default React.memo(Layout);
