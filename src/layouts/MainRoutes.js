import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/general/header";
import ProtectedRoute from "../components/protected-route/protected-route";
import { UserContext } from "../context/user";
import useHttp from "../hooks/use-http";
import Login from "../pages/auth";
import Calender from "../pages/calender/calender";
import Category from "../pages/category/category";
import CreateAccount from "../pages/createAccount/create-account";
import Dashboard from "../pages/dashboard/dashboard";
import AllEventList from "../pages/event/allEvent";
import Healthcare from "../pages/healthcare/healthcare";
import Member from "../pages/member/member";
import Message from "../pages/message/message";
import Network, { NETWORK_TABS, TAB } from "../pages/network/network";
import Profile from "../pages/profile/profile";
import Signup from "../pages/register/signup";
import Welcome from "../pages/welcome/welcomepage";
import { DashboardContainerStyle } from "../style-component/dashboard/dashboard";
import CONSTANT, { ROUTES } from "../utils/constants";
import { getEmail, getToken } from "../utils/funcs";

const MainRoutes = () => {
  const profileApi = useHttp();
  const [includeHeader, setIncludeHeader] = useState(false);
  const [user, setUser] = useState(null);
  const [profileDetail, setProfileDetail] = useState(null);
  const location = useLocation();

  const token = getToken();
  const email = getEmail();

  useEffect(() => {
    if (email && !profileDetail) {
      getProfileDetail();
    }
  }, [email]);

  useEffect(() => {
    setIncludeHeader(
      HEADER_VISIBLE_ROUTES.includes(location.pathname) ||
        location.pathname.includes("/members") ||
        location.pathname.includes("/member") ||
        location.pathname.includes("/message") ||
        location.pathname.includes("/category") ||
        location.pathname.includes("/network")
    );
  }, [location]);

  const getProfileDetail = () => {
    const url = {
      ...CONSTANT.API.getProfileDetail,
      endpoint: CONSTANT.API.getProfileDetail.endpoint.replace(":email", email),
    };
    profileApi.sendRequest(url, responseHandler);
  };

  const responseHandler = (res) => {
    if (res?.userInfo) {
      setProfileDetail({ ...res?.userInfo });
    }
  };

  const HEADER_VISIBLE_ROUTES = [
    ROUTES.HEALTHCARE,
    ROUTES.MESSAGE,
    ROUTES.HOME,
    ROUTES.PROFILE,
    ROUTES.NETWORK,
    ROUTES.CALENDER,
    ROUTES.CATEGORY,
    ROUTES.CATEGORY_FIND,
    ROUTES.MEMBER,
    ROUTES.TEMP_PROFILE,
  ];

  return (
    <UserContext.Provider
      value={{
        setUser: setUser,
        user: user,
        profileDetail: profileDetail,
        setProfileDetail: setProfileDetail,
      }}
    >
      <DashboardContainerStyle includeHeader={includeHeader}>
        {includeHeader && getToken() && getEmail() ? <Header /> : null}
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
              <Route path="auth/*" element={<Login />} />
              <Route path="register" element={<Signup />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  redirectTo={ROUTES.AUTH}
                  condition={!getToken() || !getEmail()}
                />
              }
            >
              <Route path="register" element={<Signup />} />
              <Route path="welcome" element={<Welcome />} />
              <Route path="create-account" element={<CreateAccount />} />
              <Route path={ROUTES.HEALTHCARE} element={<Healthcare />} />

              <Route path={ROUTES.NETWORK} element={<Network />} />
              <Route path={ROUTES.PROFILE} element={<Member isEdit={true} />} />
              <Route path={ROUTES.HOME} element={<Dashboard />} />
              <Route path={ROUTES.MESSAGE} element={<Message />} />
              <Route path={ROUTES.MESSAGE_TO} element={<Message />} />
              <Route path={ROUTES.CALENDER} element={<Calender />} />
              <Route
                path={ROUTES.CATEGORY}
                element={<Category isFindSayge={false} />}
              />
              <Route
                path={ROUTES.CATEGORY_FIND}
                element={<Category isFindSayge={true} />}
              />
              <Route
                path={ROUTES.CATEGORY_ACTIVE}
                element={<Category isFindSayge={true} />}
              />
              <Route path={ROUTES.MEMBER} element={<Member />} />

              <Route
                path={ROUTES.NETWORK_EVENT}
                element={<Network activateTabValue={TAB.EVENT_GROUPS} />}
              />

              <Route
                path={ROUTES.NETWORK_EVENT_DETAIL}
                element={
                  <Network
                    activateTabValue={TAB.EVENT_GROUPS}
                    isDetailPage={true}
                  />
                }
              />
              <Route
                path={ROUTES.NETWORK_INTEREST}
                element={<Network activateTabValue={TAB.INTEREST_GROUPS} />}
              />

              <Route
                path={ROUTES.NETWORK_INTEREST_DETAIL}
                element={
                  <Network
                    activateTabValue={TAB.INTEREST_GROUPS}
                    isDetailPage={true}
                  />
                }
              />

              <Route path={ROUTES.EVENT_ALL} element={<AllEventList />} />

              {/* <Route
                path={ROUTES.TEMP_PROFILE}
                element={<Member isEdit={true} />}
              /> */}
            </Route>
          </Routes>
        </Fragment>
      </DashboardContainerStyle>
    </UserContext.Provider>
  );
};

export default MainRoutes;
