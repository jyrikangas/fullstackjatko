import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  message: "",
  isError: false,
  actions: {
    setNotification: (message, isError) => {
      set({ message: message, isError: isError });
      console.log(`notification set to:${message} + ${isError}`);
    },
  },
}));
