import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserProfile } from "./constants";

var EmailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const isNonEmpty = (value) => value && value.trim() !== "";

export const isEmail = (value) => value && value.match(EmailValidationRegex);

export const notify = {
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
  error: (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
};

export const getToken = () => {
  if (UserProfile.userDetails?.token) {
    return UserProfile.userDetails?.token;
  } else {
    return localStorage.getItem("authtoken");
  }
};

export const CheckIsLogin = () => {
  const navigate = useNavigate();
  if (!getToken()) {
    navigate(`/auth`);
  }
};
