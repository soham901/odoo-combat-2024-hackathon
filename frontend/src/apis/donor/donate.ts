import api from "@/utils/api";

interface IDonate {
  total_amount: string;
  note?: string;
}

export const donate = async (data: IDonate) => {
  try {
    data.total_amount = parseFloat(data.total_amount).toFixed(2);
    return await api.post("donor/donate/", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDonationsAPI = async () => {
  try {
    return (await api.get("donor/donate/")).data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
