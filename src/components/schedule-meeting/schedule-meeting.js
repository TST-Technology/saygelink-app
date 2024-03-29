import moment from "moment";
import React, { useEffect, useState } from "react";
import PersonImage from "../../assets/images/person.png";
import useHttp from "../../hooks/use-http";
import {
  DateInputStyle,
  MessageTextAreaStyle,
  ScheduleMeetingStyle,
  SubmitButtonStyle,
  TimezoneDropdownStyle,
} from "../../style-component/message/schedule-meeting";
import CONSTANT, { DATE_FORMAT } from "../../utils/constants";
import {
  dateFormat,
  formatTime,
  isEmptyArray,
  notify,
} from "../../utils/funcs";
import ImageRole from "../general/image-role";
import Loader from "../general/loader";

const ScheduleMeeting = ({ connectionId, email, optionId, onClose, type }) => {
  const profileApi = useHttp();
  const rescheduleApi = useHttp();

  const [profileDetail, setProfileDetail] = useState(null);
  const [selectedWeekday, setSelectedWeekDay] = useState("Sun");

  const currentWeekDay = !isEmptyArray(profileDetail?.availability)
    ? profileDetail?.availability.filter((row) => row?.day === selectedWeekday)
    : [];

  useEffect(() => {
    if (email) {
      getDetails(email);
    }
  }, [email]);

  const responseHandler = (res) => {
    if (res?.userInfo) {
      setProfileDetail({ ...res?.userInfo });
    }
  };

  const getDetails = (email) => {
    const url = {
      ...CONSTANT.API.getProfileDetail,
      endpoint: CONSTANT.API.getProfileDetail.endpoint.replace(":email", email),
    };
    profileApi.sendRequest(url, responseHandler);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const payload = preparePayload(e);

    if (payload.days.length !== 3 && payload.times.length !== 3) {
      notify.error("Please Select All Option");
    } else {
      if (
        payload &&
        !isEmptyArray(payload?.times) &&
        !isEmptyArray(payload?.days)
      ) {
        const url =
          type === "reschedule"
            ? CONSTANT.API.rescheduleAvailability
            : CONSTANT.API.connect;
        rescheduleApi.sendRequest(
          url,
          handleResponse,
          payload,
          type === "reschedule"
            ? "Meeting rescheduled successfully!"
            : "Call request sent!"
        );
      }
    }
  };

  const handleResponse = () => {
    onClose(true);
  };

  const preparePayload = (e) => {
    const tempDate = [];
    const tempTime = [];
    const tempArr = [1, 2, 3];
    const newPayload = {};
    if (e.target.message.value) {
      if (type === "connect") {
        newPayload.message = e.target.message.value;
      } else {
        newPayload.reschedule_message = e.target.message.value;
      }
    }
    if (e.target.timezone.value) {
      newPayload.timezone = e.target.timezone.value;
    }
    if (connectionId) {
      newPayload.connection_id = connectionId;
    }
    if (optionId) {
      newPayload.option_id = optionId;
    }
    if (type === "connect") {
      newPayload.sayge_id = email;
    }

    tempArr.map((no) => {
      if (e.target[`option${no}date`].value) {
        const date = moment(e.target[`option${no}date`].value).format(
          DATE_FORMAT.FORMAT_7
        );
        tempDate.push(date);
      }
    });

    newPayload.days = tempDate;

    tempArr.map((no) => {
      if (e.target[`option${no}time`].value) {
        const time = formatTime(e.target[`option${no}time`].value);
        tempTime.push(time);
      }
    });

    newPayload.times = tempTime;

    return newPayload;
  };

  return (
    <ScheduleMeetingStyle>
      <>
        {profileApi.isLoading ? (
          <Loader height="calc(100vh - 250px)" />
        ) : (
          <form onSubmit={handleSubmitForm}>
            <div className="profileContainer">
              <ImageRole
                className="profileImage"
                src={profileDetail?.profile_image}
                role={profileDetail?.qualification}
              />

              <div className="rightTextContainer">
                <h2>{profileDetail?.name}</h2>

                <p>{profileDetail?.about}</p>
              </div>
            </div>
            <div className="cardMeeting">
              <p className="heading">General Availability</p>

              <div className="weekDayContainer">
                {CONSTANT.WEEK_DIGIT.map((day, index) => {
                  return (
                    <div
                      className={`weekDay ${
                        profileDetail?.availability
                          .map((avail) => avail.day)
                          .includes(day)
                          ? "addedWeekDay"
                          : ""
                      } ${selectedWeekday === day ? "selectedWeekDay" : ""}`}
                      key={index}
                      onClick={() => {
                        setSelectedWeekDay(day);
                      }}
                    >
                      <span>{day.substring(0, 2)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="timeContainer">
                {!isEmptyArray(currentWeekDay)
                  ? currentWeekDay.map((row, index) => {
                      return (
                        <p className="textText" key={index}>
                          {row?.start_time} to {row?.end_time}
                        </p>
                      );
                    })
                  : null}
              </div>
            </div>

            <div className="cardMeeting">
              <p className="heading">Add a Message</p>
              <MessageTextAreaStyle
                name="message"
                placeholder="Enter your Messages"
              />
            </div>

            <div className="cardMeeting">
              <p className="heading">Select time zone</p>
              <TimezoneDropdownStyle name="timezone">
                {CONSTANT.TIMEZONE.map((timezone) => {
                  return (
                    <option key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </option>
                  );
                })}
              </TimezoneDropdownStyle>
            </div>

            <div className="cardMeeting">
              <p className="heading">Option 1</p>

              <div className="cardCol2">
                <DateInputStyle
                  type="date"
                  placeholder="Select date"
                  name="option1date"
                  min={dateFormat(new Date(), DATE_FORMAT.FORMAT_6)}
                />

                <DateInputStyle
                  type="time"
                  placeholder="Select time"
                  name="option1time"
                />
              </div>

              <p className="heading">Option 2</p>

              <div className="cardCol2">
                <DateInputStyle
                  type="date"
                  placeholder="Select date"
                  name="option2date"
                  min={dateFormat(new Date(), DATE_FORMAT.FORMAT_6)}
                />

                <DateInputStyle
                  type="time"
                  placeholder="Select time"
                  name="option2time"
                />
              </div>

              <p className="heading">Option 3</p>

              <div className="cardCol2">
                <DateInputStyle
                  type="date"
                  placeholder="Select date"
                  name="option3date"
                  min={dateFormat(new Date(), DATE_FORMAT.FORMAT_6)}
                />

                <DateInputStyle
                  type="time"
                  placeholder="Select time"
                  name="option3time"
                />
              </div>
            </div>

            <SubmitButtonStyle disabled={rescheduleApi.isLoading}>
              {rescheduleApi.isLoading ? "Saving..." : "Submit"}
            </SubmitButtonStyle>
          </form>
        )}
      </>
    </ScheduleMeetingStyle>
  );
};

ScheduleMeeting.defaultProps = {
  type: "reschedule",
};

export default ScheduleMeeting;
