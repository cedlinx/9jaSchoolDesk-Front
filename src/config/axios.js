/* eslint-disable no-param-reassign */
import axios from "axios";
import { getToken } from "../utils/auth";

const instance = axios.create({
  // baseURL: "https://9jaschooldesk.com/api/"
  // baseURL: "https://naijaschooldesk.frb.io/api/"
  // baseURL: "https://www.9jaschooldesk.com/api"
  // baseURL: "https://app.9jaschooldesk.com/api"
  // baseURL: "https://9jaschooldesk.com/app/api"
  baseURL: "https://resource.9jaschooldesk.com/api",
  withCredentials: true
});

instance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    config.headers["Content-Type"] = "application/json";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
