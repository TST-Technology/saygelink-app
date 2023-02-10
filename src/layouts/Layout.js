import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Body from "../components/general/Body";
import MainRoutes from "./MainRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [deviceType, setDeviceType] = useState(false);
  const [size, setSize] = useState(null);

  useEffect(() => {
    displayWindowSize();
    window.addEventListener("resize", displayWindowSize);
  }, []);

  function displayWindowSize() {
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;

    setSize(w);
    if (w < 500) {
      setDeviceType(true);
    } else {
      setDeviceType(false);
    }
  }

  console.log(deviceType);
  return !deviceType ? (
    <Fragment>
      {/* Toast Container */}
      <ToastContainer />
      <Body>
        <MainRoutes />
      </Body>
    </Fragment>
  ) : (
    <></>
  );
};

export default React.memo(Layout);
