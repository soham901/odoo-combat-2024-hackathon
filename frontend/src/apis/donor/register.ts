import api from "@/utils/api";

interface Data {
  balance: string;
}

export const registerAPI = async (data: Data) => {
  try {
    data.balance = parseFloat(data.balance).toFixed(2);
    return await api.post("donor/", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
