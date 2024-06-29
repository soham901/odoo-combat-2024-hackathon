import api from "@/utils/api";

import { WorkSpace } from "@/types/workspace";

import { IPagination } from "@/types/pagination";

export const getListAPI = async (): Promise<IPagination<WorkSpace>> => {
  try {
    return (await api.get("workspaces/")).data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDetailsAPI = async (slug: string) => {
  try {
    return (await api.get(`workspaces/@${slug}/`)).data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
