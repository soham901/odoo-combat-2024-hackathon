import api from "@/utils/api";

interface Data {
  amount: string;
}

export const addBalanceAPI = async (data: Data) => {
  try {
    data.amount = parseFloat(data.amount).toFixed(2);
    return await api.post("donor/add-balance/", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
