import create from "zustand";

interface ProfileStore {
  weightUnit: "kg" | "lbs";
  convertWeightToPounds: () => void;
  convertWeightToKilos: () => void;
}

export const useProfileStore = create<ProfileStore>(set => ({
  weightUnit: "kg",
  convertWeightToPounds: () => set(() => ({ weightUnit: "lbs" })),
  convertWeightToKilos: () => set(() => ({ weightUnit: "kg" }))
}));