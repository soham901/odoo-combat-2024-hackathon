import api from "@/utils/api";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  username: string;
  display_name: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    return (await axios.post("auth/login/", credentials)) as {
      data: {
        access: string;
        refresh: string;
      };
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async (credentials: RegisterCredentials) => {
  try {
    return await axios.post("users/", credentials);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
