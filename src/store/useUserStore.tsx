import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

interface UserStore {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => {
  const savedToken = localStorage.getItem("accessToken");
  const isAuthenticated = savedToken !== null;
  return {
    loading: false,
    user: null,
    accessToken: savedToken,
    isAuthenticated,
    setLoading: (loading) => set({ loading }),
    login: (user, token) => {
      localStorage.setItem("accessToken", token);
      set({ user, isAuthenticated: true, accessToken: token });
    },
    logout: async () => {
      localStorage.removeItem("accessToken");
      set({ user: null, isAuthenticated: false, accessToken: null });
    },
  };
});
