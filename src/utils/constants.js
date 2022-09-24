import homeIcon from "../assets/images/homeicon.svg";
import messageIcon from "../assets/images/messageicon.svg";
import calenderIcon from "../assets/images/calendaricon.svg";
import globeIcon from "../assets/images/globeicon.svg";
import notiificationicon from "../assets/images/bellicon.svg";
import profileicon from "../assets/images/Profileicon.svg";
import photoicon from "../assets/images/photoicon.svg";
import Chatimg from "../assets/images/ChatPersonIcon.svg";
const CONSTANT = {
  URLS: {
    signUp: {
      type: "POST",
      endpoint: "/users/signup",
    },
  },
  CATEGORY_DATA: [
    {
      id: "cat-1",
      name: "Healthcare innovation",
      url: "/",
    },
    {
      id: "cat-2",
      name: "Student SUndry",
      url: "/",
    },
    {
      id: "cat-3",
      name: "Career interests",
      url: "/",
    },
    {
      id: "cat-4",
      name: "Work life balance",
      url: "/",
    },
  ],

  INTEREST_DATA: [
    {
      id: "ins-1",
      txtbtn: "Join",
      description: "Job Opportunities",
    },
    {
      id: "ins-2",
      txtbtn: "Join",
      description: "Job Opportunities",
    },
  ],
  CONTENT_DATA: [
    {
      id: "1",
      name: "Rebecca Shoenfield",
      img: Chatimg,
      textjust: "just now",
      textbutton: "...",
      textdescription:
        "Don’t miss out on the opportunitiy to network with alumni at our annual HPM event!  Register here.",
    },
    {
      id: "2",
      name: "Rebecca Shoenfield",
      img: Chatimg,
      textjust: "just now",
      textbutton: "...",
      textdescription:
        "Don’t miss out on the opportunitiy to network with alumni at our annual HPM event!  Register here.",
    },
    {
      id: "3",
      name: "Rebecca Shoenfield",
      img: Chatimg,
      textjust: "just now",
      textbutton: "...",
      textdescription:
        "Don’t miss out on the opportunitiy to network with alumni at our annual HPM event!  Register here.",
    },
  ],
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
  HOME_MENU: [
    {
      id: "nav-home-1",
      label: "Home",
      url: "/Home",
      image: homeIcon,
    },
    {
      id: "nav-message-2",
      label: "Message",
      url: "/Message",
      image: messageIcon,
    },
    {
      id: "nav-calender-3",
      label: "Calender",
      url: "/Calender",
      image: calenderIcon,
    },
    {
      id: "nav-network-4",
      label: "Network",
      url: "/Network",
      image: globeIcon,
    },
    {
      id: "nav-notification-5",
      url: "/Notification",
      image: notiificationicon,
    },
    {
      id: "nav-profile-6",
      url: "/Network",
      image: profileicon,
    },
    {
      id: "nav-photo-7",
      url: "/Photo",
      image: photoicon,
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
