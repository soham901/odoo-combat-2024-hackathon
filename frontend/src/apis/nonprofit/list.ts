import api from "@/utils/api";

import { NonProfit } from "@/types/nonprofit";

import { IPagination } from "@/types/pagination";

export const getListAPI = async (): Promise<IPagination<NonProfit>> => {
  try {
    return (await api.get("nonprofit/")).data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
