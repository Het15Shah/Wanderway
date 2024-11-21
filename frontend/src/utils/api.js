import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: config.BACKEND_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to dynamically add token, username, and image headers
API.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) config.headers["token"] = token;  // Add the token to the headers

  // Return the updated config
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
