import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import "react-calendar/dist/Calendar.css";
import ArrowLeftDark from "../../assets/images/arrow-left-dark.svg";
import CalenderImage from "../../assets/images/calendar-dark.svg";
import RescheduleImage from "../../assets/images/reschedule.svg";
import SendDarkImage from "../../assets/images/send-dark.svg";
import CustomCalender from "../../components/custom-calender/custom-calender";
import { CalenderContainerStyle } from "../../style-component/calender/calender";
import CONSTANT, {
  DATE_FORMAT,
  ROUTES,
  scheduleMeetingStyle,
} from "../../utils/constants";
import { dateFormat, isEmptyArray } from "../../utils/funcs";
import Loader from "../../components/general/loader";
import { Menu } from "@mui/material";
import ScheduleMeeting from "../../components/schedule-meeting/schedule-meeting";
import moment from "moment";
import ImageRole from "../../components/general/image-role";
import { useNavigate } from "react-router-dom";

const Calender = () => {
  const calenderApi = useHttp();
  const [value, setValue] = useState(new Date());
  const [connections, setConnections] = useState([]);
  const [activeConnections, setActiveConnection] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const nav = useNavigate();

  useEffect(() => {
    if (!isEmptyArray(connections)) {
      findActiveConnection(connections);
    }
  }, [value, connections]);

  useEffect(() => {
    getConnection();
  }, []);

  const responseHandler = (res) => {
    if (res?.connections) {
      setConnections([...res?.connections]);
    }
  };

  const getConnection = () => {
    calenderApi.sendRequest(CONSTANT.API.getAllConnections, responseHandler);
  };

  const findActiveConnection = (connections) => {
    const newConn = connections.filter((conn) => {
      if (conn.connect_on.day) {
        const selectedDate = dateFormat(value, DATE_FORMAT.FORMAT_2);
        return selectedDate === conn.connect_on.day;
      }
    });
    setActiveConnection(newConn);
  };

  const handleClick = (event, connection) => {
    setAnchorEl(event.currentTarget);
    console.log(connection);
    setSelectedConnection({ ...connection });
  };
  const handleClose = (apiCall) => {
    setAnchorEl(null);
    if (apiCall === true) {
      getConnection();
    }
  };

  const handlePreviousDate = () => {
    const val = moment(value).subtract(1, "days").toDate();
    setValue(val);
  };

  const handleNextDate = () => {
    const val = moment(value).add(1, "days").toDate();
    setValue(val);
  };

  const handleRedirectToMemberDetail = (memberId) => {
    if (memberId) {
      nav(ROUTES.MEMBER.replace(":memberId", memberId));
    }
  };

  return (
    <>
      {/* {calenderApi.isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : ( */}
      <CalenderContainerStyle>
        <div className="calenderPageContainer">
          <div className="calenderLeft">
            <CustomCalender
              onChange={setValue}
              value={value}
              connections={connections}
            />
          </div>

          <div className="calenderRight">
            <div className="calenderPreviewHeader">
              <div className="calenderPreviewHeaderSectionContainer">
                <div className="calenderPreviewHeaderSection">
                  <img src={CalenderImage} />

                  <p>{dateFormat(value, DATE_FORMAT.FORMAT_2)}</p>
                </div>

                <div className="calenderPreviewHeaderSection">
                  <img
                    src={ArrowLeftDark}
                    onClick={() => handlePreviousDate()}
                  />
                  <img
                    style={{ transform: "rotate(180deg)" }}
                    src={ArrowLeftDark}
                    onClick={() => {
                      handleNextDate();
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="calenderPreviewBody">
              {calenderApi.isLoading ? (
                <Loader height={`calc(100% - 95px)`} />
              ) : (
                <div className="calenderPreviewEventsContainer">
                  {!isEmptyArray(activeConnections) ? (
                    activeConnections.map((conn, index) => {
                      return (
                        <div
                          className="calenderPreviewEventSection"
                          key={index}
                        >
                          <div className="calenderPreviewEventsLeft">
                            <p>
                              {conn?.connect_on?.day
                                ? dateFormat(
                                    conn?.connect_on?.day,
                                    DATE_FORMAT.FORMAT_3
                                  )
                                : ""}
                            </p>
                          </div>
                          <div className="calenderPreviewEventsRight">
                            <div className="calenderPreviewEventCard">
                              <div className="calenderPreviewEventCardLeft">
                                <div className="calenderPreviewEventImageContainer">
                                  <ImageRole
                                    className="calenderImage"
                                    src={conn?.seeker?.profile_image}
                                    role={conn?.seeker?.qualification}
                                    onClick={() =>
                                      handleRedirectToMemberDetail(
                                        conn?.seeker?.seeker_id
                                      )
                                    }
                                  />
                                </div>
                                <div className="calenderPreviewEventTitleContainer">
                                  <h3 className="heading">{conn?.message}</h3>

                                  <p>
                                    {conn?.connect_on?.day
                                      ? dateFormat(
                                          conn?.connect_on?.day,
                                          DATE_FORMAT.FORMAT_1
                                        )
                                      : ""}
                                  </p>
                                  <a href={conn?.zoom_link}>
                                    {conn?.zoom_link}
                                  </a>
                                </div>
                              </div>
                              <div className="calenderPreviewEventCardRight">
                                <a
                                  className="meetingButton width-fixed"
                                  onClick={(e) => handleClick(e, conn)}
                                  size="small"
                                  sx={{ ml: 2 }}
                                  aria-controls={
                                    open ? "account-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                >
                                  <img src={RescheduleImage} />
                                  Re-schedule
                                </a>
                                <a
                                  target="_blank"
                                  href={conn?.zoom_link}
                                  className="meetingButton"
                                >
                                  <img src={SendDarkImage} />
                                  Join
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center mt-3">No meeting schedule</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {open ? (
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={() => handleClose(false)}
            PaperProps={{
              elevation: 0,
              sx: { ...scheduleMeetingStyle, "&:before": {} },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <ScheduleMeeting
              connectionId={selectedConnection?._id}
              email={selectedConnection?.sharer?.email}
              optionId={selectedConnection?.connect_on?._id}
              onClose={handleClose}
            />
          </Menu>
        ) : null}
      </CalenderContainerStyle>
      {/* )} */}
    </>
  );
};

export default Calender;
