import axios from "axios";

const apiURL = import.meta.env.BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: `${apiURL}/api`,
  withCredentials: true,
});
