import { darkColors, lightColors } from "../../theme/colors";
import { XertraToggleTheme } from "./types";

export const light: XertraToggleTheme = {
  handleBackground: lightColors.card,
  handleShadow: lightColors.textDisabled,
};

export const dark: XertraToggleTheme = {
  handleBackground: darkColors.card,
  handleShadow: darkColors.textDisabled,
};
