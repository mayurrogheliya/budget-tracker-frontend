import axios, { AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
