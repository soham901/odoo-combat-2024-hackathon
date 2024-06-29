import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { IDonor, IUser } from "@/types/user";

type RoleData = IDonor | undefined;

type State = {
  accessToken: string;
  isAuthenticated: boolean | undefined;
  user?: IUser;
  roleData?: RoleData;
  loading: boolean;
};

type Actions = {
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
  setLoading: (loading: boolean) => void;
  setRoleData: (roleData: RoleData) => void;
};

export const useUserStore = create(
  persist<State & Actions>(
    (set, get) => ({
      loading: true,
      accessToken: "",
      isAuthenticated: undefined,
      roleData: undefined,
      setLoading: (loading: boolean) => set({ loading }),
      setUser: (user: IUser) => set({ user }),
      login: (token: string) =>
        set({ accessToken: token, isAuthenticated: true }),
      logout: () =>
        set({
          accessToken: "",
          isAuthenticated: false,
          user: undefined,
          roleData: undefined,
        }),
      setRoleData: (roleData: RoleData) => set({ roleData }),
    }),
    {
      name: "local-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoading(false);
        }
      },
    }
  )
);
