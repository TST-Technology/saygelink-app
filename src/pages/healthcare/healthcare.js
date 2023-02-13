import React, { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HealthcareContainerStyle,
  ScrollArrowButton,
  StyleConnectButton,
  StyleFeedContainer,
  StyleMembersCard,
  StyleMembersCardContainer,
  StylePostButton,
  ThoughtsTextArea
} from "../../style-component/healthcare/healthcare";
import ColumbiaImage from "../../assets/images/Columbia_logo.svg";
import Loader from "../../components/general/loader";
import ImageRole from "../../components/general/image-role";
import PersonImage from "../../assets/images/person.png";
import FacebookImage from "../../assets/images/profileFacebook.svg";
import LinkedinImage from "../../assets/images/profileLinkedIn.svg";
import InstagramImage from "../../assets/images/profileInstagram.svg";
import TwitterImage from "../../assets/images/profileTwitter.svg";
import LinkImage from "../../assets/images/profileLink.svg";
import GalleryImage from "../../assets/images/gallery.svg";
import ImageCard from "../../components/general/image-card";
import cardBackgroundImage1 from "../../assets/images/cardBackground1.png";
import cardBackgroundImage2 from "../../assets/images/cardBackground2.png";
import Post from "../../components/general/post";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import CONSTANT, {
  ACCEPT_IMAGE_TYPE,
  DashboardHeaderHeight,
  DATE_FORMAT,
  ROUTES
} from "../../utils/constants";
import { dateFormat, getEmail, isEmptyArray } from "../../utils/funcs";
import DeleteConfirmation from "../../components/delete-confirmation/delete-confirmation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonImg from "../../assets/images/personCircleBlack.svg";
import { Tooltip } from "@mui/material";
import { UserContext } from "../../context/user";

const Healthcare = () => {
  const nav = useNavigate();
  const api = useHttp();
  const joinApi = useHttp();
  const postApi = useHttp();
  const deleteApi = useHttp();
  const email = getEmail();
  const { topicId } = useParams();
  const [allMembers, setAllMembers] = useState([]);
  const [events, setEvents] = useState(null);
  const [interests, setInterests] = useState(null);
  const [joinEventConfirmation, setJoinEventConfirmation] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [posts, setPosts] = useState(null);
  const [postValue, setPostValue] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postPreviewImage, setPostPreviewImage] = useState(null);
  const [topicDetail, setTopicDetail] = useState(null);
  const [profileDetail, setProfileDetail] = useState(null);
  const { profileDetail: personalInfo } = useContext(UserContext);

  useEffect(() => {
    if (topicId) {
      getAllMembers();
      getAllGroups();
      getAllPosts();
      getTopicDetail();
      getProfile();
    }
  }, [topicId]);

  const getAllMembers = () => {
    const url = {
      ...CONSTANT.API.findSayge,
      endpoint: CONSTANT.API.findSayge.endpoint.replace(":topicId", topicId)
    };
    api.sendRequest(url, handleMembersResponse);
  };

  const handleMembersResponse = (resp) => {
    if (resp && resp?.matchesProfiles) {
      setAllMembers(resp.matchesProfiles);
    }
  };

  const getAvailability = (avail) => {
    return (
      <div className='dayText'>
        {avail.map((row) => {
          return (
            <div>
              <span>
                {row.day} {row.start_time} {row.end_time} {row.timezone}
              </span>
            </div>
          );
        })}
      </div>
    );
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
        <div className='socialProfileContainer'>
          {socialMedia
            .filter((item) => item?.url)
            .map((media) => {
              const image = getSocialIcon(media?.name);
              return (
                <a target='_blank' href={media.url}>
                  <img src={image} className='socialImage' />
                </a>
              );
            })}
        </div>
      );
    }
  };

  const responseGroupHandler = (res) => {
    if (res?.groups) {
      const event = res.groups.filter((group) => group.groupType === "event");
      const interest = res.groups.filter(
        (group) => group.groupType === "interest"
      );
      setEvents(event);
      setInterests(interest);
    }
  };

  const getAllGroups = () => {
    joinApi.sendRequest(CONSTANT.API.getAllGroup, responseGroupHandler);
  };

  const handleJoinClick = (event) => {
    setActiveEvent(event);
    setJoinEventConfirmation(true);
  };

  const joinResponseHandler = (resp) => {
    getAllGroups();
    setJoinEventConfirmation(false);
  };

  const handleConfirmJoin = () => {
    const groupId = activeEvent?._id;
    if (groupId) {
      const url = {
        ...CONSTANT.API.joinGroup,
        endpoint: CONSTANT.API.joinGroup.endpoint.replace(":groupId", groupId)
      };
      api.sendRequest(url, joinResponseHandler);
    }
  };

  const redirectToInterest = () => {
    nav(`${ROUTES.NETWORK_INTEREST}`);
  };

  const redirectToEvent = () => {
    nav(`${ROUTES.NETWORK_EVENT}`);
  };

  const handlePostsResponse = (resp) => {
    if (resp && resp?.posts) {
      setPosts(resp?.posts.reverse());
    }
  };

  const getAllPosts = () => {
    const url = {
      ...CONSTANT.API.getAllPostsBySubject,
      endpoint: CONSTANT.API.getAllPostsBySubject.endpoint.replace(
        ":subjectId",
        topicId
      )
    };
    api.sendRequest(url, handlePostsResponse);
  };

  const handleAddPostImageResponse = (resp) => {
    if (resp) {
      getAllPosts();
      setPostValue("");
      setPostPreviewImage(null);
      setPostImage(null);
    }
  };

  const updatePostImageApi = (postId) => {
    if (postImage && postId) {
      const url = {
        ...CONSTANT.API.uploadPostImage,
        endpoint: CONSTANT.API.uploadPostImage.endpoint.replace(
          ":postId",
          postId
        )
      };
      const formData = new FormData();
      formData.append("image", postImage);
      postApi.sendRequest(url, handleAddPostImageResponse, formData);
    }
  };

  const handleAddPostResponse = (resp) => {
    if (resp && resp?.post && resp?.post?._id) {
      if (postImage) {
        updatePostImageApi(resp?.post?._id);
      } else {
        getAllPosts();
        setPostValue("");
      }
    }
  };

  const onPostClick = () => {
    if (postValue && topicId) {
      const url = {
        ...CONSTANT.API.uploadPost,
        endpoint: CONSTANT.API.uploadPost.endpoint
      };
      const payload = {
        title: topicDetail?.name,
        content: postValue,
        subject: topicId
      };
      api.sendRequest(url, handleAddPostResponse, payload);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostImage(file);
      setPostPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleTopicResponse = (resp) => {
    if (resp && resp?.topic);
    setTopicDetail(resp.topic);
  };

  const getTopicDetail = () => {
    const url = {
      ...CONSTANT.API.getTopicDetails,
      endpoint: CONSTANT.API.getTopicDetails.endpoint.replace(
        ":topicId",
        topicId
      )
    };
    api.sendRequest(url, handleTopicResponse);
  };

  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);

  const horizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  // get Profile
  const responseHandler = (res) => {
    if (res?.userInfo) {
      setProfileDetail({ ...res?.userInfo });
    }
  };

  const getProfile = () => {
    const url = {
      ...CONSTANT.API.getProfileDetail,
      endpoint: CONSTANT.API.getProfileDetail.endpoint.replace(":email", email)
    };
    api.sendRequest(url, responseHandler);
  };

  const handleDeleteResponse = (resp) => {
    if (resp) {
      getAllPosts();
    }
  };

  const callDeletePost = (postId) => {
    if (postId) {
      const url = {
        ...CONSTANT.API.deletePostBySubject,
        endpoint: CONSTANT.API.deletePostBySubject.endpoint.replace(
          ":postId",
          postId
        )
      };
      deleteApi.sendRequest(
        url,
        handleDeleteResponse,
        {},
        "Post deleted successfully!"
      );
    }
  };

  return (
    <>
      <HealthcareContainerStyle>
        {api.isLoading ? (
          <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
        ) : (
          <div className='healthCareContainer'>
            <div className='leftContainer w-75'>
              <div className='d-flex justify-content-between align-items-end'>
                <div>
                  <h3 className='heading'>Here are your SAYge Matches! </h3>
                  <h3 className='heading topic  text-muted'>
                    {topicDetail?.name}
                  </h3>
                </div>
                <div>
                  {allMembers.length > 4 ? (
                    <div class='button-contianer'>
                      <ScrollArrowButton
                        onClick={() => {
                          horizantalScroll(elementRef.current, 25, 100, -10);
                        }}
                        disabled={arrowDisable}
                      >
                        <ArrowBackIcon />
                      </ScrollArrowButton>
                      <ScrollArrowButton
                        onClick={() => {
                          horizantalScroll(elementRef.current, 25, 100, 10);
                        }}
                      >
                        <ArrowForwardIcon />
                      </ScrollArrowButton>
                    </div>
                  ) : null}
                </div>
              </div>

              <StyleMembersCardContainer ref={elementRef}>
                {Array.isArray(allMembers) && allMembers.length > 0
                  ? allMembers.map((member, index) => {
                      return (
                        <StyleMembersCard key={member.id} scale={index}>
                          <div className='headingContainer'>
                            <div>
                              <ImageRole
                                className='memberImage'
                                src={member?.profile_image}
                                role={member?.qualification}
                              />
                            </div>

                            <StyleConnectButton
                              onClick={() =>
                                nav(
                                  ROUTES.MEMBER.replace(":memberId", member?.id)
                                )
                              }
                            >
                              Connect
                            </StyleConnectButton>
                          </div>

                          <Tooltip title={member.name} placement='top'>
                            <h2 className='memberName'>{member.name}</h2>
                          </Tooltip>

                          <p className='skills'>
                            Parenting | Pregnancy | Career{" "}
                          </p>

                          <p className='insights'>Available</p>
                          {member?.availability.length > 0 ? (
                            <>{getAvailability(member?.availability)}</>
                          ) : (
                            <p className='skills'>No Schedule Available</p>
                          )}

                          <p className='insights'>Social profiles</p>
                          {member?.social_media.length > 0 ? (
                            <>{getSocialMediaIcons(member?.social_media)}</>
                          ) : (
                            <p className='skills'>No Social Media Available</p>
                          )}
                        </StyleMembersCard>
                      );
                    })
                  : null}
              </StyleMembersCardContainer>

              <StyleFeedContainer>
                <h3 className='heading'>{topicDetail?.name} board</h3>

                <p>
                  Reach out and chat with someone who made a post by clicking
                  their profile!
                </p>
                <div className='relativeContainer'>
                  <ThoughtsTextArea
                    value={postValue}
                    onChange={(e) => setPostValue(e.target.value)}
                    placeholder='Share your thoughts...'
                  />

                  <img
                    src={
                      profileDetail?.profile_image
                        ? profileDetail?.profile_image
                        : PersonImg
                    }
                    className='postPreviewImage'
                  />

                  <label htmlFor='postImage' className='profileImage'>
                    <input
                      name='postImage'
                      type='file'
                      id='postImage'
                      hidden
                      onChange={handleImageChange}
                      accept={ACCEPT_IMAGE_TYPE}
                    />
                    <span className='photoInput'>
                      <img
                        src={postPreviewImage ? postPreviewImage : GalleryImage}
                      />{" "}
                      Photo
                    </span>
                  </label>

                  <StylePostButton
                    onClick={onPostClick}
                    disabled={!postValue || postApi.isLoading}
                  >
                    {postApi.isLoading ? "Posting" : "Post"}
                  </StylePostButton>
                </div>

                <div className='postContainer'>
                  {!isEmptyArray(posts) ? (
                    posts.map((post, index) => {
                      return (
                        <Post
                          key={post._id}
                          name={post?.name}
                          time={
                            post?.createdAt
                              ? dateFormat(
                                  post?.createdAt,
                                  DATE_FORMAT.FORMAT_1
                                )
                              : ""
                          }
                          description={post?.content}
                          image={
                            post?.author?.profile_image
                              ? post?.author?.profile_image
                              : PersonImg
                          }
                          postImage={post?.image}
                          authorId={post?.author_id}
                          isOptionsVisible={
                            post?.author_id === personalInfo?.id
                          }
                          onDeletePost={() => callDeletePost(post?._id)}
                        />
                      );
                    })
                  ) : (
                    <p>No posts available.</p>
                  )}
                </div>
              </StyleFeedContainer>
            </div>
            <div className='rightContainer w-25'>
              <h3 className='heading'>My Groups</h3>

              <div className='rightSideCard'>
                {events &&
                  events.slice(0, 2).map((event, index) => {
                    return (
                      <ImageCard
                        key={event._id}
                        backgroundImage={
                          event?.image ? event?.image : cardBackgroundImage2
                        }
                        buttonText={
                          event.openGroup && event.iamPartecipant === false
                            ? "Join"
                            : ""
                        }
                        cardText={event?.title}
                        onButtonClick={() => {
                          handleJoinClick(event);
                        }}
                        headingTitle={index === 0 ? "Event groups" : ""}
                        headingButton={index === 0 ? "View all" : null}
                        onHeadingButtonClick={() => {
                          redirectToEvent();
                        }}
                      />
                    );
                  })}
              </div>

              <div className='rightSideCard'>
                {interests &&
                  interests.slice(0, 2).map((event, index) => {
                    return (
                      <ImageCard
                        key={event._id}
                        backgroundImage={
                          event?.image ? event?.image : cardBackgroundImage2
                        }
                        buttonText={
                          event.openGroup && event.iamPartecipant === false
                            ? "Join"
                            : ""
                        }
                        cardText={event?.title}
                        onButtonClick={() => {
                          handleJoinClick(event);
                        }}
                        headingTitle={index === 0 ? "Interest groups" : ""}
                        headingButton={index === 0 ? "View all" : null}
                        onHeadingButtonClick={() => {
                          redirectToInterest();
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            {joinEventConfirmation ? (
              <DeleteConfirmation
                onCancelButtonClick={() => {
                  setJoinEventConfirmation(false);
                }}
                onClose={() => {
                  setJoinEventConfirmation(false);
                }}
                onConfirmButtonClick={handleConfirmJoin}
                message='Aye you sure you want to join?'
              />
            ) : null}
          </div>
        )}
      </HealthcareContainerStyle>
    </>
  );
};

export default Healthcare;
