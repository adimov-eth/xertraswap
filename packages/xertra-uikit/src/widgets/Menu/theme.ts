import { darkColors, lightColors } from "../../theme/colors";
import { NavTheme } from "./types";

export const light: NavTheme = {
  background: lightColors.card,
  hover: "#EEEAF4",
};

// Xertra dark nav theme
export const dark: NavTheme = {
  background: darkColors.card,
  hover: "rgba(255, 255, 255, 0.05)",
};
