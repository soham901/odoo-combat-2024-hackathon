import api from "@/utils/api";

interface Data {
  name: string;
  description: string;
}

export const registerAPI = async (data: Data) => {
  try {
    return await api.post("nonprofit/", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
