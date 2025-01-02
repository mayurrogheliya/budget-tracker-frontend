import axios, { AxiosInstance } from "axios";
import { useUserStore } from "../store/useUserStore";
import { userAPI } from "./endpoints/user";

const API_URL = import.meta.env.VITE_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const { logout } = useUserStore.getState();
    if (error.response && error.response.status === 401) {
      userAPI.logout();
      logout();
    }

    return Promise.reject(error);
  }
);
