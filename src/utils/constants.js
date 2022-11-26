import UNIVERSITY_LOGO from "../assets/images/columbia_logo.png";
import male from '../assets/images/male.svg'
import female from '../assets/images/female.svg'
import other from '../assets/images/other.svg'

const CONSTANT = {
  URLS: {
    signUp: {
      type: 'POST',
      endpoint: '/users/signup'
    }
  },

  NAVIGATION_MENU: [
    {
      id: 'nav-iten-0',
      label: 'Home',
      url: '/',
      type: 'normal'
    },
    {
      id: 'nav-iten-2',
      label: 'My Store',
      url: '/mystore',
      type: 'normal'
    },
    {
      id: 'nav-iten-7',
      label: 'Lands',
      url: '/lands',
      type: 'normal'
    }
  ],

  FORM: {
    inviteLink: [
      {
        id: 'first_name',
        name: 'first_name',
        type: 'text',
        required: true,
        placeholder: 'First Name'
      },
      {
        id: 'last_name',
        name: 'last_name',
        type: 'text',
        required: true,
        placeholder: 'Last Name'
      },
      {
        id: 'last_nemailame',
        name: 'email',
        type: 'email',
        required: true,
        placeholder: 'Email ID'
      }
    ]
  },

  API: {
    login: { endpoint: `/auth/login`, type: 'POST' },
    checkUser: {
      endpoint: `/auth/whitelist/${process.env.REACT_APP_UNIVERSITY_ID}`,
      type: 'GET'
    },
    forgot: { endpoint: `/auth/forgotPassword`, type: 'POST' },
    addUserToWhitelist: {
      endpoint: `/auth/whitelist/request-access`,
      type: 'POST'
    },
    register: { endpoint: `/auth/register`, type: 'POST' },
    getCategories: { endpoint: `/categories`, type: 'GET' },
    addCategories: { endpoint: `/categories`, type: 'POST' },
    getSubcategories: {
      endpoint: `/subcategories/search/:categoryId`,
      type: 'GET'
    },
    addExperience: {
      endpoint: `/users/organization/addSayge`,
      type: 'POST'
    },
    uploadUserProfilePicture: {
      endpoint: `/users/uploadUserProfilePicture`,
      type: 'POST'
    },
    uploadUserFile: {
      endpoint: `/users/uploadUserFile`,
      type: 'POST'
    },
    updateUser: {
      endpoint: `/users/updateUser`,
      type: 'PATCH'
    },
    getAllPost: { endpoint: `/feed/hpm`, type: 'GET' },
    getAllGroup: { endpoint: `/groups/user`, type: 'GET' },
    getAllConnections: { endpoint: `/connect/getConnections`, type: 'GET' },
    getMyConnections: { endpoint: '/connect/myConnections', type: 'GET' },
    getUserNotification: { endpoint: '/users/notifications', type: 'GET' },
    getProfileDetail: { endpoint: '/users/:email', type: 'GET' },
    addLink: { endpoint: `/users/socialMedia`, type: 'PATCH' },
    deleteLink: { endpoint: `/users/socialMedia/:id`, type: 'DELETE' },
    deleteFile: { endpoint: `/users/removeUserFile`, type: 'DELETE' },
    addAvailability: { endpoint: '/users/availability/add', type: 'PUT' },
    rescheduleAvailability: {
      endpoint: '/connect/rescheduleAvailability',
      type: 'PUT'
    },
    getConnectionRequest: {
      endpoint: '/connect',
      type: 'GET'
    },
    confirmAvailability: {
      endpoint: '/connect/confirmAvailability',
      type: 'PUT'
    },
    cancelAvailability: {
      endpoint: '/connect/cancelAvailability',
      type: 'PUT'
    },
    getAllMessages: {
      endpoint: '/chat/messages/:userId',
      type: 'GET'
    },
    deleteAvailability: {
      endpoint: `/users/availability/remove/:availId`,
      type: 'DELETE'
    },
    updateUserQualification: {
      endpoint: `/users/updateUserQualification`,
      type: 'PATCH'
    },
    getConversationList: {
      endpoint: '/chat/conversation/getConversations',
      type: 'GET'
    },
    addMessage: {
      endpoint: `/chat/messages/:conversationId`,
      type: 'POST'
    }
  },
  planningStage: [
    'Tell us about yourself',
    'Upload profile picture',
    'Set up your calendar',
    'Select your experiences'
  ],
  gender: [
    { label: 'He', icon: male, value: 'male' },
    { label: 'She', icon: female, value: 'female' },
    { label: 'Non-binary', icon: other, value: 'other' }
  ],
  role: [
    { label: 'Faculty', value: 'Faculty' },
    { label: 'Student', value: 'Student' },
    { label: 'Alumni', value: 'Alumni' }
  ],
  WEEK_DIGIT: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  TIMEZONE: [
    {
      label: 'EDT',
      value: 'Eastern Time (US and Canada)'
    }
  ]
}

export const UNIVERSITY_DATA = {
  logo: UNIVERSITY_LOGO
}

export const UserProfile = {
  userDetails: {}
}

export const screenSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const devices = {
  mobileS: `(max-width: ${screenSizes.mobileS})`,
  mobileM: `(max-width: ${screenSizes.mobileM})`,
  mobileL: `(max-width: ${screenSizes.mobileL})`,
  tablet: `(max-width: ${screenSizes.tablet})`,
  laptop: `(max-width: ${screenSizes.laptop})`,
  laptopL: `(max-width: ${screenSizes.laptopL})`,
  desktop: `(max-width: ${screenSizes.desktop})`
}

export const userInviteEmail = {
  userData: {}
}

export const ROUTES = {
  HOME: '/',
  MESSAGE: '/message',
  HEALTHCARE: '/healthcare',
  NETWORK: '/network',
  PROFILE: '/profile',
  CALENDER: '/calender',
  AUTH: '/auth'
}

export const WEEKDAY_SELECTOR_TYPE = {
  AVAILABILITY: 'AVAILABILITY',
  SCHEDULE_CALL: 'SCHEDULE_CALL'
}

export const DashboardHeaderHeight = '70px'

export const DATE_FORMAT = {
  FORMAT_1: 'DD MMM YYYY hh:mm A',
  FORMAT_2: 'MMM D, YYYY',
  FORMAT_3: 'hh:mm A',
  FORMAT_4: 'DD-MM-YYYY'
}

export const NO_DATA_AVAILABLE = 'No Data Available'

export const ACCEPT_FILE_TYPE = 'application/pdf'

export const ACCEPT_IMAGE_TYPE = 'image/png, image/jpeg, image/jpg'

export const scheduleMeetingStyle = {
  borderRadius: '10px',
  boxShadow: 'none',
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 2.5,
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 30,
    width: 40,
    height: 40,
    bgcolor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0
  }
} 

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  RECEIVE_NOTIFICATION: 'receive-notification',
  ONLINE_USERS: 'online-users',
  MESSAGE_RECEIVE: 'msg-receive',
  SEND_MESSAGE: 'send-msg',
  ADD_USER: 'add-user'
}

export const ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ALUMNI: 'alumni'
}

export const KEYBOARD = {
  ENTER: 'Enter'
}


export default CONSTANT;
