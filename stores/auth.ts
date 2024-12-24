import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { setCookie } from "cookies-next";

interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  age: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    devtools((set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email, password) => {
        try {
          const response = await axios.post("/api/auth/login", {
            email,
            password,
          });
          const { token, user } = response.data;
          setCookie("authToken", token, { maxAge: 60 * 60 * 24 }); //
          set({ user, isAuthenticated: true, token });
        } catch (error: unknown) {
          alert("Login failed: " + error);
        }
      },
      updateUser: (user: User) => {
        set({ user });
      },
      logout: () => {
        setCookie("authToken", "", { maxAge: -1 });
        set({ user: null, isAuthenticated: false, token: null });
      },
    })),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
