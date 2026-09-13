import { create } from "zustand";
import { axiosInstance } from "../config/axios";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import type { AuthResponse, IUser, LogoutResponse } from "../types/users";

type LoginData = {
  email: string;
  password: string;
};

type SignupData = {
  fullName: string;
  email: string;
  password: string;
};

// type ResetTypes = {
//   token: string | null;
//   newPassword: string;
// };

type useAuthStoreState = {
  user: IUser | null;
  isCheckingAuth: boolean;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isLoggingOut: boolean;
  // isGettingResetLink: boolean;
  // isResetingPassword: boolean;

  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  // forgotPassword: (email: string) => Promise<void>;
  // resetPassword: (data: ResetTypes) => Promise<void>;
};

export const useAuthStore = create<useAuthStoreState>((set) => ({
  user: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false,
  // isGettingResetLink: false,
  // isResetingPassword: false,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });

      const res = await axiosInstance.get<AuthResponse>("/auth/me");

      set({ user: res.data.user });
      toast.success(res.data?.message || "Authorized");
    } catch (error) {
      set({ user: null });
      let message;
      if (isAxiosError(error)) {
        message = error.response?.data?.message;
      }
      toast.error(message || "Unauthorized");
      console.error("Error in the checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });

      const res = await axiosInstance.post<LogoutResponse>("/auth/logout");

      set({ user: null });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error in logout", error);
      let message;
      if (isAxiosError(error)) {
        message = error.response?.data?.message;
      }

      toast.error(message || "Failed to logout");
    } finally {
      set({ isLoggingOut: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });

      const res = await axiosInstance.post<AuthResponse>("/auth/login", data);

      set({ user: res.data?.user });

      toast.success(res.data?.message || "Logged in successfully");
    } catch (error) {
      let message;
      if (isAxiosError(error)) {
        message = error.response?.data?.message;
      }
      console.error("Error in login", error);
      toast.error(message || "Failed log in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });

      const res = await axiosInstance.post<AuthResponse>("/auth/signup", data);

      set({ user: res.data?.user });

      toast.success(res.data?.message);
    } catch (error) {
      let message;
      if (isAxiosError(error)) {
        message = error.response?.data?.message;
      }
      console.error("Error in the signup", error);
      toast.error(message || "Error signing up");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // forgotPassword: async (email) => {
  //   try {
  //     set({ isGettingResetLink: true });

  //     const res = await axiosInstance.post("/auth/forgot-password", { email });

  //     toast.success(res.data?.message || "Email sent");
  //   } catch (error) {
  //     console.log("Error on forgotPassword", error);
  //     let message;
  //     if (isAxiosError(error)) {
  //       message = error.response?.data?.message;
  //     }
  //     toast.error(message || "Unexpected error has occured");
  //   } finally {
  //     set({ isGettingResetLink: false });
  //   }
  // },

  // resetPassword: async (data) => {
  //   try {
  //     set({ isResetingPassword: true });

  //     const res = await axiosInstance.post("/auth/reset-password", data);

  //     toast.success(res.data?.message || "Password successfully reset");
  //   } catch (error) {
  //     console.log("Error reseting password", error);
  //     let message;
  //     if (isAxiosError(error)) {
  //       message = error.response?.data?.message;
  //     }
  //     toast.error(message || "Unexpected error has occured");
  //   } finally {
  //     set({ isResetingPassword: false });
  //   }
  // },
}));
