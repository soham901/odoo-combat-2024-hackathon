import axios, { AxiosError } from "axios";

import {
  baseURL,
  AuthHeaderType,
  accessToken,
  withCredentials,
  ROUTES,
} from "@/configs/api";
import { useUserStore } from "@/stores/useUser";

import { useRouter } from "next/navigation";

const api = axios.create({
  baseURL,
  withCredentials,
});

// refresh access token
const refreshAccessToken = async () => {
  const router = useRouter();

  try {
    const response = await axios.get(`${baseURL}auth/refresh/`, {
      withCredentials: true,
    });
    const newAccessToken = response.data.access;
    useUserStore.setState({ accessToken: newAccessToken });
    return newAccessToken;
  } catch (error: AxiosError | any) {
    if (error.response.status === 401) {
      useUserStore.getState().logout();
      router.replace(ROUTES);
      return;
    }
    throw new Error("Failed to refresh access token");
  }
};

// request interceptor for attaching token
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (!token) return config;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      useUserStore.getState().logout();
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers.Authorization = `${AuthHeaderType} ${newAccessToken}`;
        return axios.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
