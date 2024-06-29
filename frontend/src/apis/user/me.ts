import { IUser } from "@/types/user";
import api from "@/utils/api";

export const meAPI = async () => {
  try {
    return (await api.get("users/me/")).data as IUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
