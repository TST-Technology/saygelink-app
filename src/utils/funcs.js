import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserProfile } from "./constants";
import moment from 'moment'

var EmailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const isNonEmpty = (value) => value && value.trim() !== ''

export const isEmail = (value) => value && value.match(EmailValidationRegex)

export const notify = {
  success: (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  },
  error: (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }
}

export const getToken = () => {
  if (UserProfile.userDetails?.token) {
    return UserProfile.userDetails?.token
  } else {
    return localStorage.getItem('authToken')
  }
}

export const getEmail = () => {
  return localStorage.getItem('email')
}

export const CheckIsLogin = () => {
  const navigate = useNavigate()
  if (!getToken()) {
    navigate(`/auth`)
  }
}

export const isEmptyArray = (arr) => {
  if (arr && Array.isArray(arr) && arr.length > 0) {
    return false
  } else {
    return true
  }
}

export const dateFormat = (date, format) => {
  return moment(date).format(format)
}

export const prepareLink = (url) => {
  if (url) {
    if (url.toLowerCase().includes('twitter')) {
      return {
        name: 'Twitter',
        url: url
      }
    } else if (url.toLowerCase().includes('facebook')) {
      return {
        name: 'Facebook',
        url: url
      }
    } else if (url.toLowerCase().includes('linkedin')) {
      return {
        name: 'LinkedIn',
        url: url
      }
    } else if (url.toLowerCase().includes('instagram')) {
      return {
        name: 'Instagram',
        url: url
      }
    } else {
      return {
        name: 'Other',
        url: url
      }
    }
  }
}