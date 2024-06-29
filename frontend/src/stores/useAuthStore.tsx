import { create } from "zustand";
import { useRouter } from "next/router";
import api from "@/utils/api";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    try {
      const response = await api.get("auth/user");
      set({ user: response.data.user, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("auth/login", credentials);
    set({ user: response.data.user });
  },
  logout: async () => {
    await api.get("auth/logout");
    useRouter().push("/");
    set({ user: null });
  },
}));

export default useAuthStore;
