import React, { useContext, useEffect, useState } from "react";
import {
  EventDetailStyle,
  LeaveButtonStyle,
  StyleViewButton
} from "../../style-component/network/event-detail";
import cardBackgroundImage3 from "../../assets/images/cardBackground3.png";
import ImageRole from "../general/image-role";
import PersonImage from "../../assets/images/person.png";
import {
  StyleFeedContainer,
  StylePostButton,
  ThoughtsTextArea
} from "../../style-component/healthcare/healthcare";
import CONSTANT, {
  ACCEPT_IMAGE_TYPE,
  DATE_FORMAT,
  ROUTES
} from "../../utils/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import ColumbiaImage from "../../assets/images/Columbia_logo.svg";
import Post from "../general/post";
import { dateFormat, isEmptyArray, notify } from "../../utils/funcs";
import GalleryImage from "../../assets/images/gallery.svg";
import useHttp from "../../hooks/use-http";
import Loader from "../general/loader";
import { UserContext } from "../../context/user";
import PersonImg from "../../assets/images/personCircleBlack.svg";

const EventDetail = ({ eventDetail }) => {
  const postApi = useHttp();
  const api = useHttp();
  const deleteApi = useHttp();
  const leaveApi = useHttp();

  const { groupId } = useParams();
  const nav = useNavigate();
  const [posts, setPosts] = useState(null);
  const [postValue, setPostValue] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postPreviewImage, setPostPreviewImage] = useState(null);
  const [participants, setParticipants] = useState(null);
  const { profileDetail } = useContext(UserContext);

  const totalMembers =
    eventDetail?.participants && eventDetail?.participants.length;

  useEffect(() => {
    if (groupId) getAllPosts();
  }, []);

  useEffect(() => {
    if (
      eventDetail &&
      !isEmptyArray(eventDetail?.participantsInfo) &&
      profileDetail &&
      profileDetail?.id
    ) {
      setParticipants(
        eventDetail?.participantsInfo.filter(
          (row) => row.id !== profileDetail?.id
        )
      );
    }
  }, [eventDetail, profileDetail]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPostImage(file);
      setPostPreviewImage(URL.createObjectURL(file));
    }
  };

  const onPostClick = () => {
    if (postValue && groupId) {
      const url = {
        ...CONSTANT.API.uploadPostToGroup,
        endpoint: CONSTANT.API.uploadPostToGroup.endpoint
      };
      const payload = {
        title: eventDetail?.title,
        content: postValue,
        group_id: groupId
      };
      api.sendRequest(url, handleAddPostResponse, payload);
    }
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
        ...CONSTANT.API.uploadPostImageToGroup,
        endpoint: CONSTANT.API.uploadPostImageToGroup.endpoint.replace(
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

  const handlePostsResponse = (resp) => {
    if (resp && resp?.posts) {
      setPosts(resp?.posts);
    }
  };

  const getAllPosts = () => {
    const url = {
      ...CONSTANT.API.getAllPostsByGroupId,
      endpoint: CONSTANT.API.getAllPostsByGroupId.endpoint.replace(
        ":groupId",
        groupId
      )
    };
    api.sendRequest(url, handlePostsResponse);
  };

  const handleDeleteResponse = (resp) => {
    if (resp) {
      getAllPosts();
    }
  };

  const callDeletePost = (postId) => {
    if (postId) {
      const url = {
        ...CONSTANT.API.deletePostOfGroup,
        endpoint: CONSTANT.API.deletePostOfGroup.endpoint.replace(
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

  const handleLeaveGroupResponse = (resp) => {
    if (resp) {
      notify.success("Group Leaved Successfully!");
      nav(ROUTES.NETWORK_EVENT);
    }
  };

  const handleLeaveGroup = () => {
    if (groupId) {
      const url = {
        ...CONSTANT.API.leaveUserGroup,
        endpoint: CONSTANT.API.leaveUserGroup.endpoint.replace(
          ":groupId",
          groupId
        )
      };
      leaveApi.sendRequest(url, handleLeaveGroupResponse);
    }
  };

  return (
    <>
      {api.isLoading ? (
        <Loader height={`calc(80vh)`} />
      ) : (
        <EventDetailStyle>
          <div className='relativeContainer'>
            <ImageRole
              className='eventImage'
              src={eventDetail?.image}
              defaultImage={cardBackgroundImage3}
            />

            <LeaveButtonStyle onClick={handleLeaveGroup}>
              Leave
            </LeaveButtonStyle>
          </div>

          <div className='titleContainer'>
            <h3 className='eventTitle'>{eventDetail?.title}</h3>
            <span className='memberCount'>{totalMembers} Members</span>
          </div>

          <div>
            <p>
              Ask a question or share something with the group here! Chat
              privately with someone who made a post by clicking their profile!
            </p>
          </div>

          <div className='eventDetailParticipantContainer'>
            <div className='eventDetailPostContainer'>
              <StyleFeedContainer isEventDetailPage={true}>
                <div className='relativeContainer'>
                  <ThoughtsTextArea
                    value={postValue}
                    onChange={(e) => setPostValue(e.target.value)}
                    placeholder='Share your thoughts'
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
                    isEventDetailPage={true}
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
                            post?.author_id === profileDetail?.id
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
            <div className='eventParticipantsDetail align-items-end'>
              <div className='w-100'>
                <h5 className='eventTitle'>Connect with other members</h5>
              </div>
              <div className='d-flex text-align-end justify-content-end mt-3'>
                <Link to={"/event/" + groupId} className='eventAllText'>
                  See All
                </Link>
              </div>

              <div className='participantsLisContainer'>
                {participants && !isEmptyArray(participants)
                  ? participants.map((participant) => {
                      return (
                        <div>
                          <div
                            className='participantCard'
                            key={participant?.id}
                          >
                            <div className='participantHeader'>
                              <ImageRole
                                src={participant?.profile_image}
                                className='participantImage'
                                role={participant?.qualification}
                              />
                            </div>

                            <h4 className='participantName'>
                              {participant?.name}
                            </h4>
                            {participant?.experience &&
                            !isEmptyArray(participant?.experience) ? (
                              <p className='participantExperience'>
                                {participant?.experience.map((row, index) => {
                                  if (index > 0) {
                                    return ` | ${row?.name}`;
                                  } else {
                                    return `${row?.name}`;
                                  }
                                })}
                              </p>
                            ) : null}

                            <StyleViewButton
                              onClick={() => {
                                nav(
                                  ROUTES.MEMBER.replace(
                                    ":memberId",
                                    participant?.id
                                  )
                                );
                              }}
                            >
                              View
                            </StyleViewButton>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </EventDetailStyle>
      )}
    </>
  );
};

export default EventDetail;
