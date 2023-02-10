import UNIVERSITY_LOGO from "../assets/images/columbia_logo.png";
import male from "../assets/images/male.svg";
import female from "../assets/images/female.svg";
import other from "../assets/images/other.svg";

const CONSTANT = {
  URLS: {
    signUp: {
      type: "POST",
      endpoint: "/users/signup"
    }
  },

  NAVIGATION_MENU: [
    {
      id: "nav-iten-0",
      label: "Home",
      url: "/",
      type: "normal"
    },
    {
      id: "nav-iten-2",
      label: "My Store",
      url: "/mystore",
      type: "normal"
    },
    {
      id: "nav-iten-7",
      label: "Lands",
      url: "/lands",
      type: "normal"
    }
  ],

  FORM: {
    inviteLink: [
      {
        id: "first_name",
        name: "first_name",
        type: "text",
        required: true,
        placeholder: "First Name"
      },
      {
        id: "last_name",
        name: "last_name",
        type: "text",
        required: true,
        placeholder: "Last Name"
      },
      {
        id: "last_nemailame",
        name: "email",
        type: "email",
        required: true,
        placeholder: "Email ID"
      }
    ]
  },

  API: {
    login: { endpoint: `/auth/login`, type: "POST" },
    checkUser: {
      endpoint: `/auth/whitelist/${process.env.REACT_APP_UNIVERSITY_ID}`,
      type: "GET"
    },
    forgot: { endpoint: `/auth/forgotPassword`, type: "POST" },
    addUserToWhitelist: {
      endpoint: `/auth/whitelist/request-access`,
      type: "POST"
    },
    register: { endpoint: `/auth/register`, type: "POST" },
    getCategories: { endpoint: `/categories`, type: "GET" },
    addCategories: { endpoint: `/categories`, type: "POST" },
    getSubcategories: {
      endpoint: `/subcategories/search/:categoryId`,
      type: "GET"
    },
    addExperience: {
      endpoint: `/users/organization/addSayge`,
      type: "POST"
    },
    uploadUserProfilePicture: {
      endpoint: `/users/uploadUserProfilePicture`,
      type: "POST"
    },
    uploadUserFile: {
      endpoint: `/users/uploadUserFile`,
      type: "POST"
    },
    updateUser: {
      endpoint: `/users/updateUser`,
      type: "PATCH"
    },
    getAllPost: { endpoint: `/feed/hpm`, type: "GET" },
    getAllGroup: { endpoint: `/groups/user`, type: "GET" },
    getAllConnections: { endpoint: `/connect/getConnections`, type: "GET" },
    getMyConnections: { endpoint: "/connect/myConnections", type: "GET" },
    getUserNotification: { endpoint: "/users/notifications", type: "GET" },
    getProfileDetail: { endpoint: "/users/:email", type: "GET" },
    addLink: { endpoint: `/users/socialMedia`, type: "PATCH" },
    deleteLink: { endpoint: `/users/socialMedia/:id`, type: "DELETE" },
    deleteFile: { endpoint: `/users/removeUserFile`, type: "DELETE" },
    addAvailability: { endpoint: "/users/availability/add", type: "PUT" },
    rescheduleAvailability: {
      endpoint: "/connect/rescheduleAvailability",
      type: "PUT"
    },
    getConnectionRequest: {
      endpoint: "/connect",
      type: "GET"
    },
    confirmAvailability: {
      endpoint: "/connect/confirmAvailability",
      type: "PUT"
    },
    cancelAvailability: {
      endpoint: "/connect/cancelAvailability",
      type: "PUT"
    },
    getAllMessages: {
      endpoint: "/chat/messages/:userId",
      type: "GET"
    },
    deleteAvailability: {
      endpoint: `/users/availability/remove/:availId`,
      type: "DELETE"
    },
    updateUserQualification: {
      endpoint: `/users/updateUserQualification`,
      type: "PATCH"
    },
    getConversationList: {
      endpoint: "/chat/conversation/getConversations",
      type: "GET"
    },
    addMessage: {
      endpoint: `/chat/messages/:conversationId`,
      type: "POST"
    },
    joinGroup: {
      endpoint: `/groups/user/join/:groupId`,
      type: "PUT"
    },
    deleteUser: {
      endpoint: "/users/deleteUser/:email",
      type: "DELETE"
    },
    updateUserPassword: {
      endpoint: `/users/updateUserPassword`,
      type: "PATCH"
    },
    connect: {
      endpoint: "/connect",
      type: "POST"
    },
    beASayge: {
      endpoint: "/users/organization/addSayge",
      type: "POST"
    },
    removeSayge: {
      endpoint: "/users/organization/removeSayge/:saygeId",
      type: "DELETE"
    },
    findSayge: {
      endpoint: "/users/organization/findSayge/:topicId",
      type: "GET"
    },
    userDetailById: {
      endpoint: "/users/userId",
      type: "GET"
    },
    getOrCreateConversation: {
      endpoint: "/chat/conversation/getOrCreateConversation",
      type: "POST"
    },
    getAllPostsBySubject: {
      endpoint: "/feed/userTopic/:subjectId",
      type: "GET"
    },
    uploadPost: {
      endpoint: "/feed/userTopic",
      type: "POST"
    },
    uploadPostImage: {
      endpoint: "/feed/userTopic/uploadImage/:postId",
      type: "POST"
    },
    getTopicDetails: {
      endpoint: "/topics/:topicId",
      type: "GET"
    },
    getGroupDetails: { endpoint: `/groups/:groupId`, type: "GET" },
    getAllPostsByGroupId: {
      endpoint: "/feed/groups/:groupId",
      type: "GET"
    },
    uploadPostToGroup: {
      endpoint: "/feed/groups",
      type: "POST"
    },
    uploadPostImageToGroup: {
      endpoint: "/feed/groups/uploadImage/:postId",
      type: "POST"
    },
    deletePostOfGroup: {
      endpoint: "/feed/groups/:postId",
      type: "DELETE"
    },
    deletePostBySubject: {
      endpoint: "/feed/userTopic/:postId",
      type: "DELETE"
    }
  },
  planningStage: [
    "Tell us about yourself",
    "Upload profile picture",
    "Set up your calendar",
    "Select your experiences"
  ],
  gender: [
    { label: "He", icon: male, value: "male" },
    { label: "She", icon: female, value: "female" },
    { label: "Non-binary", icon: other, value: "other" }
  ],
  role: [
    { label: "Faculty", value: "Faculty" },
    { label: "Student", value: "Student" },
    { label: "Alumni", value: "Alumni" }
  ],
  WEEK_DIGIT: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  TIMEZONE: [
    { label: "Hawaii", value: "Hawaii" },
    { label: "Alaska", value: "Alaska" },
    {
      label: "Pacific Time (US and Canada)",
      value: "Pacific Time (US and Canada)"
    },
    {
      label: "Mountain Time (US and Canada)",
      value: "Mountain Time (US and Canada)"
    },
    {
      label: "Central Time (US and Canada)",
      value: "Central Time (US and Canada)"
    },
    {
      label: "Eastern Time (US and Canada)",
      value: "Eastern Time (US and Canada)"
    }
  ]
};

export const UNIVERSITY_DATA = {
  logo: UNIVERSITY_LOGO
};

export const UserProfile = {
  userDetails: {}
};

export const screenSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

export const devices = {
  mobileS: `(max-width: ${screenSizes.mobileS})`,
  mobileM: `(max-width: ${screenSizes.mobileM})`,
  mobileL: `(max-width: ${screenSizes.mobileL})`,
  tablet: `(max-width: ${screenSizes.tablet})`,
  laptop: `(max-width: ${screenSizes.laptop})`,
  laptopL: `(max-width: ${screenSizes.laptopL})`,
  desktop: `(max-width: ${screenSizes.desktop})`
};

export const userInviteEmail = {
  userData: {}
};

export const ROUTES = {
  HOME: "/",
  MESSAGE: "/message",
  MESSAGE_TO: "/message/:conversationId",
  HEALTHCARE: "/members/:topicId",
  NETWORK: "/network",
  PROFILE: "/profile",
  CALENDER: "/calender",
  AUTH: "/auth",
  CATEGORY: "/category",
  CATEGORY_FIND: "/category/find",
  CATEGORY_ACTIVE: "/category/:categoryId",
  MEMBER: "/member/:memberId",
  TEMP_PROFILE: "/temp/profile",
  NETWORK_EVENT: "/network/event",
  NETWORK_EVENT_DETAIL: "/network/event/:groupId",
  NETWORK_INTEREST: "/network/interest",
  NETWORK_INTEREST_DETAIL: "/network/interest/:groupId",
  EVENT_ALL: "/event/:groupId"
};

export const WEEKDAY_SELECTOR_TYPE = {
  AVAILABILITY: "AVAILABILITY",
  SCHEDULE_CALL: "SCHEDULE_CALL"
};

export const DashboardHeaderHeight = "70px";

export const DATE_FORMAT = {
  FORMAT_1: "DD MMM YYYY hh:mm A",
  FORMAT_2: "MMM D, YYYY",
  FORMAT_3: "hh:mm A",
  FORMAT_4: "DD-MM-YYYY",
  FORMAT_5: "DD MMM YYYY",
  FORMAT_6: "YYYY-MM-DD",
  FORMAT_7: "MM-DD-YYYY"
};

export const NO_DATA_AVAILABLE = "No Data Available";

export const ACCEPT_FILE_TYPE = "application/pdf";

export const ACCEPT_IMAGE_TYPE = "image/png, image/jpeg, image/jpg";

export const scheduleMeetingStyle = {
  borderRadius: "10px",
  boxShadow: "none",
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 2.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 30,
    width: 40,
    height: 40,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0
  }
};

export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  RECEIVE_NOTIFICATION: "receive-notification",
  ONLINE_USERS: "online-users",
  MESSAGE_RECEIVE: "msg-receive",
  SEND_MESSAGE: "send-msg",
  ADD_USER: "add-user"
};

export const ROLES = {
  STUDENT: "student",
  FACULTY: "faculty",
  ALUMNI: "alumni"
};

export const KEYBOARD = {
  ENTER: "Enter"
};

export const visitedMember = {
  detail: {}
};

export default CONSTANT;
