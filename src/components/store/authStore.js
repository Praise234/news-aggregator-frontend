import { create } from "zustand";

export const authStore = create((set) => ({
  isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
  loginDetails: JSON.parse(localStorage.getItem("loginDetails")) || {},

  setIsLogin: (isLogin) => {
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
    set({ isLogin });
  },

  setLoginDetails: (loginDetails) => {
    localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
    set({ loginDetails });
  },
}));
