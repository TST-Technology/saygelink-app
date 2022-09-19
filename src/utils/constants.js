const CONSTANT = {
  URLS: {
    signUp: {
      type: "POST",
      endpoint: "/users/signup",
    },
  },

  NAVIGATION_MENU: [
    {
      id: "nav-iten-0",
      label: "Home",
      url: "/",
      type: "normal",
    },
    {
      id: "nav-iten-2",
      label: "My Store",
      url: "/mystore",
      type: "normal",
    },
    {
      id: "nav-iten-7",
      label: "Lands",
      url: "/lands",
      type: "normal",
    },
  ],

  FORM: {
    inviteLink: [
      {
        id: "first_name",
        name: "first_name",
        type: "text",
        required: true,
        placeholder: "First Name",
      },
      {
        id: "last_name",
        name: "last_name",
        type: "text",
        required: true,
        placeholder: "Last Name",
      },
      {
        id: "last_nemailame",
        name: "email",
        type: "email",
        required: true,
        placeholder: "Email ID",
      },
    ],
  },
  API: {
    login: { endpoint: `/auth/login`, type: "POST" },
    checkUser: {
      endpoint: `/auth/whitelist/${process.env.REACT_APP_UNIVERSITY_ID}`,
      type: "GET",
    },
    forgot: { endpoint: `/auth/forgotPassword`, type: "POST" },
    addUserToWhitelist: {
      endpoint: `/auth/whitelist/request-access`,
      type: "POST",
    },
  },
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

export default CONSTANT;
