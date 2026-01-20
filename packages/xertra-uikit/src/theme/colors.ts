import { Colors } from "./types";

// Xertra color palette - deeper purple to match xertra.com
export const baseColors = {
  failure: "#ED4B9E",
  primary: "#7168C0",
  primaryBright: "#8A7FD4",
  primaryDark: "#5B52A8",
  secondary: "#9A8FD1",
  success: "#31D0AA",
  warning: "#FFB237",
};

export const brandColors = {
  binance: "#F0B90B",
};

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: "#FAF9FA",
  backgroundDisabled: "#E9EAEB",
  contrast: "#191326",
  dropdown: "#F6F6F6",
  invertedContrast: "#FFFFFF",
  input: "#eeeaf4",
  inputSecondary: "#d7caec",
  tertiary: "#EFF4F5",
  text: "#452A7A",
  textDisabled: "#BDC2C4",
  textSubtle: "#8f80ba",
  borderColor: "#E9EAEB",
  card: "#FFFFFF",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: "#9A8FD1",
  background: "#101112",
  backgroundDisabled: "#2A2C2D",
  contrast: "#FFFFFF",
  dropdown: "#1A1C1D",
  invertedContrast: "#101112",
  input: "#2A2C2D",
  inputSecondary: "#3A3C3D",
  primaryDark: "#7168C0",
  tertiary: "#252728",
  text: "rgba(255, 255, 255, 0.8)",
  textDisabled: "rgba(255, 255, 255, 0.4)",
  textSubtle: "rgba(255, 255, 255, 0.6)",
  borderColor: "rgba(255, 255, 255, 0.1)",
  card: "#1A1C1D",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #1A1C1D 0%, #252728 100%)",
  },
};
