import { InputHTMLAttributes } from "react";

export type XertraToggleTheme = {
  handleBackground: string;
  handleShadow: string;
};

// Backwards compatibility
export type PancakeToggleTheme = XertraToggleTheme;

export const scales = {
  SM: "sm",
  MD: "md",
} as const;

export type Scales = typeof scales[keyof typeof scales];

export interface XertraToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  scale?: Scales;
  checked?: boolean;
}

// Backwards compatibility
export type PancakeToggleProps = XertraToggleProps;

export interface HandleProps {
  scale: Scales;
}

export interface InputProps {
  scale: Scales;
}

export const scaleKeys = {
  handleSize: "handleSize",
  travelDistance: "travelDistance",
  toggleHeight: "toggleHeight",
  toggleWidth: "toggleWidth",
  handleThickness: "handleThickness",
} as const;

export type ScaleKeys = typeof scaleKeys[keyof typeof scaleKeys];
