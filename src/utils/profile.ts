import create from "zustand";

type ProfileStore = {
  weightUnit: "kg" | "lbs";
  changeWeightToPounds: () => void;
  changeWeightToKilos: () => void;
  convertKilosToPounds: (value: number) => string;
};

export const useProfileStore = create<ProfileStore>(set => ({
  weightUnit: "kg",
  changeWeightToPounds: () => set(() => ({ weightUnit: "lbs" })),
  changeWeightToKilos: () => set(() => ({ weightUnit: "kg" })),
  convertKilosToPounds: (value: number) => {
    // 2.20462262 -> metric value for converting kg to pounds
    const convertedValue = value * 2.20462262;
    return convertedValue.toFixed(2);
  }
}));
