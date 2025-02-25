"use client";
import { create } from "zustand";
import axios from "axios";
import { User } from "@prisma/client";

interface AuthState {
  user: User | null;
  userLoading: boolean;
  isAuthenticated: boolean;
  initialise: () => void;
  login: () => void;
  getUser: (token: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

const initialState = {
  user: null,
  userLoading: true,
  token: null,
  isAuthenticated: false,
};

const useAuthStore = create<AuthState>()(
  // persist(
  (set, get) => ({
    ...initialState,
    initialise: async () => {
      try {
        const user = await axios.get("/api/user");
        set({ user: user.data, userLoading: false });
      } catch (error) {
        // set({ user: null, userLoading: false, isAuthenticated: false });
        get().logout();
      }
    },
    login: () => {
      set({ isAuthenticated: true });
    },
    getUser: async () => {
      try {
        const user = await axios.get("/api/user");
        set({ user: user.data, userLoading: false });
      } catch (error) {
        set({
          user: null,
          userLoading: false,
          isAuthenticated: false,
        });
      }
    },
    updateUser: (user) => {
      set({ user });
    },
    logout: async () => {
      const user = await axios.post("/api/logout");
      set(initialState);
      // window.location.href = "/login";
    },
  })
  // )
);

export default useAuthStore;
