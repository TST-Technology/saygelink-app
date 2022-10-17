import axios from "axios";
import { getToken } from "../utils/funcs";

export const Services = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
  },
});
