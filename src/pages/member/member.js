import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "debounce";
import ImageRole from "../../components/general/image-role";
import Loader from "../../components/general/loader";
import useHttp from "../../hooks/use-http";
import VerifiedImage from "../../assets/images/verified.svg";
import FacebookImage from "../../assets/images/profileFacebook.svg";
import LinkedinImage from "../../assets/images/profileLinkedIn.svg";
import InstagramImage from "../../assets/images/profileInstagram.svg";
import TwitterImage from "../../assets/images/profileTwitter.svg";
import LinkImage from "../../assets/images/profileLink.svg";
import FileImage from "../../assets/images/file.svg";
import UpImage from "../../assets/images/upArrow.svg";
import SettingImage from "../../assets/images/setting.svg";
import TrashIcon from "../../assets/images/trash.svg";
import AddGreenImage from "../../assets/images/AddGreen.svg";
import DefaultCategoryImage from "../../assets/images/defaultCategoryImage.svg";
import LogoutIcon from "../../assets/images/log-out.svg";
import {
  EditButtonStyle,
  MemberContainerStyle,
  ScheduleCallButtonStyle,
  SendMessageButtonStyle,
  StyleCategoryCard,
  StyleChatRequestInput,
} from "../../style-component/member/member";
import CONSTANT, {
  ACCEPT_FILE_TYPE,
  DashboardHeaderHeight,
  ROUTES,
  scheduleMeetingStyle,
  visitedMember,
} from "../../utils/constants";
import ScheduleMeeting from "../../components/schedule-meeting/schedule-meeting";
import { Menu } from "@mui/material";
import { UserContext } from "../../context/user";
import { getEmail, isEmptyArray, prepareURL } from "../../utils/funcs";
import EditProfile from "../../components/edit-profile/edit-profile";
import Dialog from "../../components/dialog/dialog";
import AddLink from "../../components/profile/add-link";
import DeleteConfirmation from "../../components/delete-confirmation/delete-confirmation";
import AddAvailability from "../../components/profile/add-availability";
import { StyleSingleItem } from "../../style-component/profile/profile";
import { useCallback } from "react";

const Member = ({ isEdit }) => {
  const nav = useNavigate();
  const api = useHttp();
  const messageApi = useHttp();
  const { memberId } = useParams();
  const [profileDetail, setProfileDetail] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    setUser,
    user,
    setProfileDetail: setProfile,
    profileDetail: detail,
  } = useContext(UserContext);
  const [selectedWeekday, setSelectedWeekDay] = useState("Sun");
  const [editProfileDialog, setEditProfileDialog] = useState();

  // Edit
  const profileApi = useHttp();
  const chatRequestApi = useHttp();
  const variableTimeApi = useHttp();
  const email = getEmail();
  const [maximumRequests, setMaximumRequests] = useState(null);
  const [linkDialogVisible, setLinkDialogVisible] = useState(false);
  const [isDeleteLinkConfirmation, setIsDeleteLinkConfirmation] =
    useState(false);
  const [isDeleteFileConfirmation, setIsDeleteFileConfirmation] =
    useState(false);
  const [deleteLink, setDeleteLink] = useState(null);
  const [
    isDeleteAvailabilityConfirmation,
    setIsDeleteAvailabilityConfirmation,
  ] = useState(false);
  const [availabilityId, setAvailabilityId] = useState(null);
  const [availabilityDialogVisible, setAvailabilityDialogVisible] =
    useState(false);
  const [isVariableTime, setIsVariableTime] = useState(false);

  useEffect(() => {
    if (email && isEdit) {
      getProfile();
      getVariableTime();
    }
  }, [isEdit]);

  useEffect(() => {
    if (!isEdit && memberId) {
      getMemberDetail();
    }
  }, [memberId, isEdit]);

  const handleVariableTimeResponse = (resp) => {
    if (resp) {
      setIsVariableTime(resp?.variableMeetingTime);
    }
  };

  const getVariableTime = () => {
    variableTimeApi.sendRequest(
      CONSTANT.API.getVariableMeetingTime,
      handleVariableTimeResponse
    );
  };

  const handleMemberResponse = (resp) => {
    if (resp && resp?.userInfo) {
      setProfileDetail(resp?.userInfo);
    }
  };

  const getMemberDetail = () => {
    if (memberId) {
      const url = {
        ...CONSTANT.API.userDetailById,
        endpoint: CONSTANT.API.userDetailById.endpoint.replace(
          "userId",
          memberId
        ),
      };
      api.sendRequest(url, handleMemberResponse);
    }
  };

  const getSocialIcon = (type) => {
    switch (type) {
      case "Twitter":
        return TwitterImage;
      case "LinkedIn":
        return LinkedinImage;
      case "Facebook":
        return FacebookImage;
      case "Instagram":
        return InstagramImage;
      default:
        return LinkImage;
    }
  };

  const getSocialMediaIcons = (socialMedia) => {
    if (socialMedia) {
      return (
        <div className="socialProfileContainer">
          {socialMedia
            .filter((item) => item?.url)
            .map((media) => {
              const image = getSocialIcon(media.name);
              return (
                <div className="socialMediaLink">
                  <div className="">
                    <a
                      target="_blank"
                      className="mediaLink"
                      href={prepareURL(media.url)}
                    >
                      <img src={image} className="socialImage" />
                      {media.url}
                    </a>
                  </div>
                  {isEdit ? (
                    <div
                      className="deleteButtonContainer"
                      onClick={() => handleDeleteLinkClick(media)}
                    >
                      <img src={TrashIcon} />
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
      );
    }
  };

  const handleScheduleCall = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const prepareNewMember = (conversationId) => {
    const newMember = {
      createdAt: new Date(),
      participants: {
        name: profileDetail?.name,
        email: profileDetail?.email,
        profile_image: profileDetail?.profile_image,
        qualification: profileDetail?.qualification,
        qualification_year: profileDetail?.qualification_year,
        unseen_messages: "N/A",
        _id: profileDetail?.id,
      },
      _id: conversationId,
    };
    return newMember;
  };

  const handleSendMessageResponse = (resp) => {
    if (
      resp &&
      resp?.conversation &&
      resp?.conversation[0] &&
      resp?.conversation[0]._id
    ) {
      const conversationId = resp?.conversation[0]._id;
      visitedMember.detail = prepareNewMember(conversationId);
      nav(ROUTES.MESSAGE_TO.replace(":conversationId", conversationId));
    } else if (resp && resp?.conversation && resp?.conversation?._id) {
      const conversationId = resp?.conversation?._id;
      visitedMember.detail = prepareNewMember(conversationId);
      nav(ROUTES.MESSAGE_TO.replace(":conversationId", conversationId));
    }
  };

  const onSendMessage = (memberId) => {
    const payload = {
      participants: [memberId, detail?.id],
    };
    messageApi.sendRequest(
      CONSTANT.API.getOrCreateConversation,
      handleSendMessageResponse,
      payload
    );
  };

  const currentWeekDay = !isEmptyArray(profileDetail?.availability)
    ? profileDetail?.availability.filter((row) => row?.day === selectedWeekday)
    : [];

  // Edit Api Calls
  const responseHandler = (res) => {
    if (res?.userInfo) {
      setProfile({ ...res?.userInfo });
      setProfileDetail({ ...res?.userInfo });
      setMaximumRequests(res?.userInfo?.max_chat_requests);
    }
  };

  const getProfile = () => {
    const url = {
      ...CONSTANT.API.getProfileDetail,
      endpoint: CONSTANT.API.getProfileDetail.endpoint.replace(":email", email),
    };
    profileApi.sendRequest(url, responseHandler);
  };

  const updateChatRequests = useCallback(
    debounce((currentValue) => {
      const payload = {
        max_chat_requests: currentValue,
      };
      chatRequestApi.sendRequest(
        CONSTANT.API.updateUser,
        () => {},
        payload,
        "Maximum chat requests updated successfully!"
      );
    }, 1000),
    []
  );

  const onChatRequestChange = (flag) => {
    let currentValue = 0;

    if (flag === "+") {
      setMaximumRequests((prevValue) => {
        currentValue = prevValue + 1;
        updateChatRequests(currentValue);

        return currentValue;
      });
    } else if (flag === "-") {
      setMaximumRequests((prevValue) => {
        currentValue = prevValue - 1;
        updateChatRequests(currentValue);

        return currentValue;
      });
    } else {
      updateChatRequests(currentValue);

      setMaximumRequests(flag.target.value);
      currentValue = flag.target.value;
    }
  };

  const handleEditProfileClose = (apiCall) => {
    setEditProfileDialog(false);
    if (apiCall) {
      getProfile();
    }
  };

  const handleUploadFile = (pdfFile) => {
    if (pdfFile) {
      const formData = new FormData();
      formData.append("file", pdfFile);
      profileApi.sendRequest(
        CONSTANT.API.uploadUserFile,
        getProfile,
        formData,
        "Attachment added successfully!"
      );
    }
  };

  const handleCloseLinkDialog = (apiCall) => {
    if (apiCall) {
      getProfile();
    }
    setLinkDialogVisible(false);
  };

  const handleDeleteLinkClick = (link) => {
    setIsDeleteLinkConfirmation(true);
    setDeleteLink({ ...link });
  };

  const handleConfirmLinkClick = () => {
    if (deleteLink?._id) {
      const url = {
        ...CONSTANT.API.deleteLink,
        endpoint: CONSTANT.API.deleteLink.endpoint.replace(
          ":id",
          deleteLink?._id
        ),
      };
      setIsDeleteLinkConfirmation(false);
      profileApi.sendRequest(url, getProfile, {}, "Link deleted successfully!");
    }
  };

  const handleDeleteUserFile = () => {
    setIsDeleteFileConfirmation(true);
  };

  const deleteUserFile = () => {
    profileApi.sendRequest(
      CONSTANT.API.deleteFile,
      getProfile,
      {},
      "Attachment deleted successfully!"
    );
    setIsDeleteFileConfirmation(false);
  };

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // setPdfFile(file)
      handleUploadFile(file);
    }
  };

  const handleAvailabilityDelete = (avail) => {
    if (avail) {
      setIsDeleteAvailabilityConfirmation(true);
      setAvailabilityId(avail?._id);
    }
  };

  const deleteAvailability = () => {
    if (availabilityId) {
      const url = {
        ...CONSTANT.API.deleteAvailability,
        endpoint: CONSTANT.API.deleteAvailability.endpoint.replace(
          ":availId",
          availabilityId
        ),
      };
      profileApi.sendRequest(
        url,
        getProfile,
        {},
        "Availability deleted successfully!"
      );
      setIsDeleteAvailabilityConfirmation(false);
    }
  };

  const handleCloseAvailabilityDialog = (apiCall) => {
    if (apiCall) {
      getProfile();
    }
    setAvailabilityDialogVisible(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    nav(ROUTES.AUTH);
  };

  return (
    <>
      {api.isLoading || profileApi.isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
        <MemberContainerStyle>
          <div className="profileTopSection">
            <div className="profileTopLeftSection">
              <div className="profileImageContainer">
                <ImageRole
                  className="profileMemberImage"
                  src={profileDetail?.profile_image}
                  alt=""
                />
              </div>

              <div className="profileLeftDetailContainer">
                <div className="nameRoleContainer">
                  <h3>{profileDetail?.name}</h3>
                  <span>{profileDetail?.qualification}</span>
                </div>
                <div className="otherFieldsContainer">
                  <div className="otherField">
                    <p className="value">Post</p>
                    <b className="title">{profileDetail?.num_posts}</b>
                  </div>

                  <div className="otherField">
                    <p className="value">Meets</p>
                    <b className="title">{profileDetail?.num_meets}</b>
                  </div>
                  <div className="otherField">
                    <p className="value">Verified</p>
                    <img src={VerifiedImage} />
                  </div>
                </div>
              </div>
            </div>
            <div className="profileTopRightSection">
              <div className="profileButtonContainer">
                {isEdit ? (
                  <>
                    <EditButtonStyle onClick={() => setEditProfileDialog(true)}>
                      <div>
                        <img src={SettingImage} />
                      </div>
                      <span>Edit</span>
                    </EditButtonStyle>
                    <EditButtonStyle onClick={() => handleLogoutClick()}>
                      <img src={LogoutIcon}></img>
                      <span>Logout</span>
                    </EditButtonStyle>
                  </>
                ) : (
                  <>
                    <ScheduleCallButtonStyle onClick={handleScheduleCall}>
                      Schedule a Call
                    </ScheduleCallButtonStyle>
                    <SendMessageButtonStyle
                      onClick={() => onSendMessage(profileDetail?.id)}
                      disabled={messageApi.isLoading}
                    >
                      {messageApi.isLoading ? "Loading" : "Send Message"}
                    </SendMessageButtonStyle>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="profileBottomSection">
            <div>
              <div className="section">
                <div className="sectionHeadingContainer">
                  <h2 className="memberSectionHeading">About Me</h2>

                  {isEdit ? (
                    <a
                      className="editAction"
                      onClick={() => setEditProfileDialog(true)}
                    >
                      Edit
                    </a>
                  ) : null}
                </div>

                <p className="bioDetail">{profileDetail?.about}</p>
              </div>

              <div className="section">
                <div className="sectionHeadingContainer">
                  <h2 className="memberSectionHeading">Insights</h2>
                  {isEdit ? (
                    <a
                      className="editAction"
                      onClick={() => {
                        nav(ROUTES.CATEGORY);
                      }}
                    >
                      Edit
                    </a>
                  ) : null}
                </div>

                <div className="insightContainer">
                  {profileDetail?.experience ? (
                    profileDetail?.experience.map((exp) => {
                      return (
                        <StyleCategoryCard key={exp?.category_id}>
                          <div className="imageContainer">
                            <img
                              src={
                                exp?.image ? exp?.image : DefaultCategoryImage
                              }
                              className="categoryImage"
                            />
                          </div>
                          <div className="labelContainer">
                            <span className="label">{exp?.name}</span>
                          </div>
                        </StyleCategoryCard>
                      );
                    })
                  ) : (
                    <p className="mt-3">No Insights</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="section">
                <div className="sectionHeadingContainer">
                  <h2 className="memberSectionHeading">General Availability</h2>

                  {isEdit ? <a className="editAction">Edit</a> : null}
                </div>
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
                <div className="timingContainer">
                  {isEdit ? (
                    <div className="timing">
                      <div
                        className="addTimeContainer"
                        onClick={() => setAvailabilityDialogVisible(true)}
                      >
                        <img src={AddGreenImage} /> Add
                      </div>{" "}
                    </div>
                  ) : null}
                  {!isEmptyArray(currentWeekDay) ? (
                    currentWeekDay.map((avail, index) => {
                      return (
                        <div key={avail?._id} className="timing">
                          <span>{`${avail?.start_time} - ${avail?.end_time}`}</span>

                          {isEdit ? (
                            <div
                              className="deleteButtonContainer"
                              onClick={() => {
                                handleAvailabilityDelete(avail);
                              }}
                            >
                              <img src={TrashIcon} />
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  ) : (
                    <p className="mt-3">No Availability</p>
                  )}
                </div>
                {/* {isVariableTime ? ( */}
                {/* <p className='mt-4'>variable, message me for availability.</p> */}
                {/* ) : null} */}
              </div>

              {isEdit ? (
                <div className="section">
                  <div className="sectionHeadingContainer">
                    <h2 className="memberSectionHeading">
                      Maximum chat requests
                    </h2>
                  </div>

                  <p className="tooltipSubHeading">
                    <b>Tip:</b> Feel free to select a limit for the number of
                    chat requests you’d like per month.
                  </p>
                  <div className="chatRequestsSection">
                    <div className="chatRequestsContainer">
                      <StyleChatRequestInput
                        type={"number"}
                        value={maximumRequests}
                        onChange={(e) => {
                          onChatRequestChange(e);
                        }}
                      ></StyleChatRequestInput>
                      <div className="chatRequestActionContainer">
                        <a
                          className="increment button"
                          onClick={() => {
                            onChatRequestChange("+");
                          }}
                        >
                          <img className="upArrow" src={UpImage} />
                        </a>

                        <a
                          className="decrement button"
                          onClick={() => {
                            onChatRequestChange("-");
                          }}
                        >
                          <img className="downArrow" src={UpImage} />
                        </a>
                      </div>
                    </div>
                    <span>chat requests per month.</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div>
              <div className="section">
                <div className="sectionHeadingContainer">
                  <h2 className="memberSectionHeading">Attachments</h2>

                  {isEdit ? (
                    <div className="addAttachmentContainer">
                      <label htmlFor="attachment" className="attachment">
                        <input
                          name="attachment"
                          type="file"
                          id="attachment"
                          hidden
                          onChange={handlePdfChange}
                          accept={ACCEPT_FILE_TYPE}
                        />{" "}
                        <a className="editAction">
                          {profileDetail?.file ? "Edit" : "Add"}
                        </a>
                      </label>{" "}
                    </div>
                  ) : null}
                </div>

                {profileDetail?.file ? (
                  <div className="fileContainer">
                    <a
                      className="attachmentContainer"
                      href={profileDetail?.file}
                    >
                      <img src={FileImage} />
                      <span>Attachments.pdf</span>
                    </a>

                    {isEdit ? (
                      <div
                        className="deleteButtonContainer"
                        onClick={() => {
                          handleDeleteUserFile();
                        }}
                      >
                        <img src={TrashIcon} />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-3">No Attachments</p>
                )}
              </div>

              <div className="section">
                <div className="sectionHeadingContainer">
                  <h2 className="memberSectionHeading">Social Media</h2>

                  {isEdit ? (
                    <a
                      className="editAction"
                      onClick={() => {
                        setLinkDialogVisible(true);
                      }}
                    >
                      Add
                    </a>
                  ) : null}
                </div>
              </div>

              {getSocialMediaIcons(profileDetail?.social_media)}
            </div>
          </div>

          {editProfileDialog ? (
            <EditProfile
              profileDetail={profileDetail}
              open={editProfileDialog}
              onClose={(flag) => handleEditProfileClose(flag)}
              handleUploadFile={handleUploadFile}
            />
          ) : null}
          <Dialog
            content={<AddLink onClose={() => handleCloseLinkDialog(true)} />}
            title="Add Link"
            onClose={() => {
              handleCloseLinkDialog(false);
            }}
            open={linkDialogVisible}
            width="500px"
          />

          <Dialog
            content={
              <AddAvailability
                selectedWeekday={selectedWeekday}
                onClose={() => handleCloseAvailabilityDialog(true)}
              />
            }
            title="Add Availability"
            onClose={() => {
              handleCloseAvailabilityDialog(false);
            }}
            open={availabilityDialogVisible}
            width="500px"
          />

          {isDeleteLinkConfirmation ? (
            <DeleteConfirmation
              onCancelButtonClick={() => {
                setIsDeleteLinkConfirmation(false);
              }}
              onConfirmButtonClick={() => {
                handleConfirmLinkClick();
              }}
            />
          ) : null}

          {isDeleteFileConfirmation ? (
            <DeleteConfirmation
              onCancelButtonClick={() => {
                setIsDeleteFileConfirmation(false);
              }}
              onConfirmButtonClick={() => {
                deleteUserFile();
              }}
            />
          ) : null}

          {isDeleteAvailabilityConfirmation ? (
            <DeleteConfirmation
              onCancelButtonClick={() => {
                setIsDeleteAvailabilityConfirmation(false);
              }}
              onConfirmButtonClick={() => {
                deleteAvailability();
              }}
            />
          ) : null}

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: scheduleMeetingStyle,
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <ScheduleMeeting
              email={profileDetail?.email}
              type="connect"
              onClose={() => {
                handleClose();
              }}
            />
          </Menu>
        </MemberContainerStyle>
      )}
    </>
  );
};

Member.defaultProps = {
  isEdit: false,
};

export default Member;
