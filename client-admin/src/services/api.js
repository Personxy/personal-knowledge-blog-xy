import axios from "axios";
import { message } from "antd";

const api = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
});

// Request interceptor
// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        message.error("会话已过期，请重新登录");
      } else {
        message.error(data.message || "请求失败");
      }
    } else {
      message.error("网络错误");
    }
    return Promise.reject(error);
  }
);

export default api;
