import { useEffect } from "react";
import toast from "react-hot-toast";
import create from "zustand";

type OnlineStore = {
  onlineStatus: boolean;
  setOffline: () => void;
  setOnline: () => void;
};

export const useOnlineStore = create<OnlineStore>(set => ({
  onlineStatus: true,
  setOffline: () => set(() => ({ onlineStatus: false })),
  setOnline: () => set(() => ({ onlineStatus: true }))
}));

export const useOnlineStatus = () => {
  const { setOffline, setOnline } = useOnlineStore();

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOffline(), toast.error("You have lost network connection");
    });

    window.addEventListener("online", () => {
      setOnline();
      toast.success("You have regained network connection");
    });

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, [setOffline, setOnline]);
};
