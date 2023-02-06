import React, { useState } from "react";
import {
  HeaderContainerStyle,
  NotificationContainerStyle,
} from "../../style-component/header";
import shortLogo from "../../assets/images/short_logo.png";
import defaultWhiteImage from "../../assets/images/PersonCircleWhite.svg";
import HomeLogo from "../../assets/images/home.svg";
import MessageLogo from "../../assets/images/message.svg";
import CalenderLogo from "../../assets/images/calendar.svg";
import GlobLogo from "../../assets/images/globe.svg";
import BellLogo from "../../assets/images/bell.svg";
import ProfileLogo from "../../assets/images/profile.svg";
import PersonImg from "../../assets/images/person.png";
import CONSTANT, { ROUTES, SOCKET_EVENTS } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@mui/material";
import Notification from "./notification";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import ConnectionRequest from "./connection-request";
import { isEmptyArray } from "../../utils/funcs";
import { useContext } from "react";
import { UserContext } from "../../context/user";
import ImageRole from "./image-role";
import { socket } from "../../utils/socket";
import ReorderIcon from "@mui/icons-material/Reorder";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const nav = useNavigate();
  const connectApi = useHttp();
  const [pendingRequestCount, setPendingRequestCount] = useState(null);
  const [floatMenuType, setFloatMenuType] = useState(null);
  const [requestDetail, setRequestDetail] = useState(null);
  const { profileDetail } = useContext(UserContext);
  const [isNotification, setIsNotification] = useState(false);
  const [tabletMenuOpen, setTabletMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  // const [flag, setFlag] = useState(!)

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, [window.location.pathname]);

  const displayWindowSize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    displayWindowSize();
  });

  window.addEventListener("resize", displayWindowSize);

  useEffect(() => {
    getRequests();

    socket.on(SOCKET_EVENTS.RECEIVE_NOTIFICATION, (notification) => {
      console.log(SOCKET_EVENTS.RECEIVE_NOTIFICATION, notification);
      if (notification) {
        setIsNotification(true);
      }
    });

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_NOTIFICATION);
    };
  }, []);

  const HEADER_TABS = [
    {
      label: "Home",
      icon: HomeLogo,
      route: ROUTES.HOME,
    },
    {
      label: "Message",
      icon: MessageLogo,
      route: ROUTES.MESSAGE,
    },
    {
      label: "Calender",
      icon: CalenderLogo,
      route: ROUTES.CALENDER,
    },
    {
      label: "Network",
      icon: GlobLogo,
      route: ROUTES.NETWORK_EVENT,
    },
  ];

  const handleClick = (event) => {
    setFloatMenuType("notification");
    setAnchorEl(event.currentTarget);
    setIsNotification(false);
  };

  const handleRequestClick = (event) => {
    setFloatMenuType("request");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleHeaderClick = (tab) => {
    setActiveTab(tab.route);
    nav(tab.route);
  };

  const responseHandler = (resp) => {
    if (resp && resp?.count && resp?.connections) {
      setPendingRequestCount(resp?.count);
      setRequestDetail(resp?.connections.reverse());
    }
  };

  const getRequests = () => {
    connectApi.sendRequest(CONSTANT.API.getConnectionRequest, responseHandler);
  };

  const handleLogoClick = () => {
    nav(ROUTES.HOME);
  };

  const onClickNav = () => {
    setTabletMenuOpen(!tabletMenuOpen);
  };

  return (
    <HeaderContainerStyle>
      <div className="headerContainer">
        <div
          className="leftSection"
          onClick={() => {
            handleLogoClick();
          }}
        >
          {tabletMenuOpen ? null : (
            <>
              <img src={shortLogo} />
              <p>Sayge Link</p>
            </>
          )}
        </div>

        <div
          className={
            screenWidth > 768 || tabletMenuOpen ? "rightSection" : "d-none"
          }
        >
          {HEADER_TABS.map((tab, index) => {
            return (
              <div
                key={tab.label}
                className={`headerTab ${
                  activeTab === tab.route ? "activeHeader" : ""
                }`}
                onClick={() => {
                  handleHeaderClick(tab);
                }}
              >
                <img className="headerTabImage" src={tab.icon} />

                {tab.label ? (
                  <p className="headerTabTitle">{tab.label}</p>
                ) : null}
              </div>
            );
          })}
          <div className="width-30 notificationIcon" onClick={handleClick}>
            <img src={BellLogo} className="headerImages" />

            {isNotification ? <div className="notificationDot"></div> : null}
          </div>

          <div
            className="profileHeaderImageContainer width-30"
            onClick={handleRequestClick}
          >
            <img
              src={ProfileLogo}
              className="headerImages profileHeaderImage"
            />
            {pendingRequestCount ? (
              <div className="requestCount">{pendingRequestCount}</div>
            ) : null}
          </div>

          <ImageRole
            onClick={() => {
              setActiveTab(null);
              nav(ROUTES.PROFILE);
            }}
            src={profileDetail?.profile_image}
            height="33px"
            width="33px"
            radius={"50%"}
            className="headerImages"
            defaultImage={defaultWhiteImage}
          />
        </div>

        <div className="rightSectionIcon">
          {tabletMenuOpen ? (
            <div onClick={onClickNav}>
              <CloseIcon />
            </div>
          ) : (
            <div onClick={onClickNav}>
              <ReorderIcon />
            </div>
          )}
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "10px",
            boxShadow: "none",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            width: 500,
            mt: 2.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 15,
              right: 10,
              width: 40,
              height: 40,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {floatMenuType === "notification" ? <Notification /> : null}
        {floatMenuType === "request" ? (
          <ConnectionRequest detail={requestDetail} getDetail={getRequests} />
        ) : null}
      </Menu>
    </HeaderContainerStyle>
  );
};

export default Header;
