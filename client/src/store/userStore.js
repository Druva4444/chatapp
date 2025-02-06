import { create } from "zustand";
import { persist } from "zustand/middleware";
import { io } from "socket.io-client";

const userstore = create(
  persist(
    (set, get) => ({
      user: null,
      islogin: false,
      name: "",
      socketId: null,
      users: [],
      userobj:null,
      socket: null, // Store socket instance in state
      setuserobj: (userobj) => set({ userobj }),
      setname: (name) => set({ name }),

      setuser: (user) => set({ user, islogin: true }),

      setlogin: () => set((state) => ({ islogin: !state.islogin })),

      setsocket: () => {
        if (!get().socket) {
          const socket = io("http://localhost:3000", {
            query: { id: get().user },
          });

          socket.on("connect", () => {
            console.log("Connected to server, Socket ID:", socket.id);
            set({ socketId: socket.id, socket }); // Store socket in state
          });

          socket.on("getusers", (userids) => {
            set({ users: userids });
            console.log(get().users);
          });

          socket.on("disconnect", () => {
            console.log("Disconnected from server");
            set({ socketId: null, socket: null });
          });
        }
      },

      disconnectsocket: () => {
        const socket = get().socket;
        if (socket) {
          socket.disconnect();
          console.log("Socket manually disconnected");
          set({ socket: null, socketId: null });
        }
      },

      getsocket: () => get().socket, // Retrieve the socket instance from state
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        user: state.user,
        islogin: state.islogin,
        name: state.name,
        socketId: state.socketId,
      }),
    }
  )
);

export default userstore;
