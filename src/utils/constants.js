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
  ]
}

export const UNIVERSITY_DATA = {
  logo: UNIVERSITY_LOGO,
};

export const UserProfile = {
  userDetails: {},
};

export const screenSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const devices = {
  mobileS: `(max-width: ${screenSizes.mobileS})`,
  mobileM: `(max-width: ${screenSizes.mobileM})`,
  mobileL: `(max-width: ${screenSizes.mobileL})`,
  tablet: `(max-width: ${screenSizes.tablet})`,
  laptop: `(max-width: ${screenSizes.laptop})`,
  laptopL: `(max-width: ${screenSizes.laptopL})`,
  desktop: `(max-width: ${screenSizes.desktop})`,
};

export const userInviteEmail = {
  userData: {},
};

export const ROUTES = {
  HOME: '/',
  MESSAGE: '/message',
  HEALTHCARE: '/healthcare'
}

export const WEEKDAY_SELECTOR_TYPE = {
  AVAILABILITY: 'AVAILABILITY',
  SCHEDULE_CALL: 'SCHEDULE_CALL'
}

export default CONSTANT;
