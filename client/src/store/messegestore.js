import { create } from "zustand";
import { persist } from "zustand/middleware";
import userstore from "./userStore.js";

const messagestore = create(
  persist(
    (set, get) => ({
      selecteduser: null,
      setselecteduser: (user) => {
        set({ selecteduser: user });
        get().updatemsg(); // Call updatemsg whenever a new user is selected
      },

      messages: [],
      setMessages: (messages) => set({ messages }),
      clearmessages: () => set({ messages: [] }),

      updatemsg: () => {
        const socket = userstore.getState().getsocket(); // Always get latest socket

        if (!socket) {
          console.warn("Socket not initialized yet!");
          return;
        }

        console.log("Listening on socket ID:", socket.id);

        socket.off("newmessege"); // Ensure no duplicate listeners
        socket.on("newmessege", (mesg) => {
          console.log("activated");
          set((state) => ({ messages: [...state.messages, mesg] }));
        });
      },
    }),
    {
      name: "message-store", // LocalStorage key
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default messagestore;
