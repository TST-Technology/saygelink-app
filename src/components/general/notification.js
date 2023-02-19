import React, { useState } from "react";
import { NotificationContainerStyle } from "../../style-component/header";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import CONSTANT, { DATE_FORMAT } from "../../utils/constants";
import { dateFormat, isEmptyArray } from "../../utils/funcs";
import Loader from "./loader";

const Notification = () => {
  const [notifications, setNotifications] = useState();
  const notificationApi = useHttp();
  const lastNotificationTimeStamp = localStorage.getItem(
    "notificationTimeStamp"
  );

  useEffect(() => {
    getNotification();

    return () => {
      localStorage.setItem("notificationTimeStamp", Date.now());
    };
  }, []);

  const responseHandler = (res) => {
    if (res?.notifications) {
      setNotifications(res?.notifications);
    }
  };

  const getNotification = () => {
    notificationApi.sendRequest(
      CONSTANT.API.getUserNotification,
      responseHandler
    );
  };

  return (
    <NotificationContainerStyle>
      {notificationApi.isLoading ? (
        <Loader height='350px' />
      ) : (
        <>
          {!isEmptyArray(notifications) ? (
            notifications.map((notification) => {
              return (
                <>
                  <div className='notification' key={notification._id}>
                    <div className='textContainer'>
                      <span
                        className={`round ${
                          lastNotificationTimeStamp &&
                          Date.parse(notification.createdAt) >
                            parseInt(lastNotificationTimeStamp)
                            ? "redRound"
                            : ""
                        }`}
                      ></span>
                      <p className='text'>{notification.info}</p>
                    </div>

                    <p className='time'>
                      {notification.createdAt
                        ? dateFormat(
                            notification.createdAt,
                            DATE_FORMAT.FORMAT_1
                          )
                        : ""}
                    </p>
                  </div>
                </>
              );
            })
          ) : (
            <h2>No Notifications available.</h2>
          )}
        </>
      )}
    </NotificationContainerStyle>
  );
};

export default Notification;
