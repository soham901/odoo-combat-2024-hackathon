import { Role } from "@/types/user";
import api from "@/utils/api";

export const getProfileAPI = async (role: Role) => {
  try {
    return await api.get(`${role}/me`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
