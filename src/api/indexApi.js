import axios from "axios";
import { toast } from "react-toastify";

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

export const jsonApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error(error.data.message);
    if (error.data.message === "토큰이 만료되었습니다. 다시 로그인 해주세요.") {
    }
    return Promise.reject(error);
  }
);

jsonApi.interceptors.request.use(
  async (config) => {
    const { data } = await authApi.get("/user");
    if (data.success) return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
