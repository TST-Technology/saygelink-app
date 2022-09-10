import axios from "axios";

export const Services = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("authToken"),
  },
});
