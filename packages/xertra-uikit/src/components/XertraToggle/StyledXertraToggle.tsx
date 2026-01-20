import styled from "styled-components";
import { scales, XertraToggleProps, HandleProps, InputProps, ScaleKeys } from "./types";

const scaleKeyValues = {
  sm: {
    handleSize: "16px",
    travelDistance: "16px",
    toggleHeight: "20px",
    toggleWidth: "36px",
    handleThickness: "1px",
  },
  md: {
    handleSize: "32px",
    travelDistance: "34px",
    toggleHeight: "40px",
    toggleWidth: "72px",
    handleThickness: "2px",
  },
};

const getScale = (property: ScaleKeys) => ({ scale = scales.MD }: XertraToggleProps) => {
  return scaleKeyValues[scale][property];
};

export const ToggleStack = styled.div<HandleProps>`
  position: relative;
  display: inline-block;

  &:label:before {
    content: none;
  }

  .handle {
    background: ${({ theme }) => theme.xertraToggle?.handleBackground || theme.pancakeToggle?.handleBackground || theme.colors.card};
    border-radius: 50%;
    width: ${getScale("handleSize")};
    height: ${getScale("handleSize")};
    position: absolute;
    transition: 0.3s ease;
    top: 4px;
    left: 4px;
    box-shadow: 0 ${getScale("handleThickness")} 0 ${getScale("handleThickness")}
      ${({ theme }) => theme.xertraToggle?.handleShadow || theme.pancakeToggle?.handleShadow || theme.colors.textDisabled};
  }
`;

export const ToggleInput = styled.input<InputProps>`
  height: 40px;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 40px;

  &:focus + label {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:checked + label .handle {
    transform: translateX(${getScale("travelDistance")});
  }
`;

export const ToggleLabel = styled.label<XertraToggleProps>`
  width: ${getScale("toggleWidth")};
  height: ${getScale("toggleHeight")};
  background: ${({ theme, checked }) => theme.colors[checked ? "success" : "input"]};
  box-shadow: ${({ theme }) => theme.shadows.inset};
  display: inline-block;
  border-radius: 50px;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: 20% center;
  cursor: pointer;
`;

// Backwards compatibility exports
export const PancakeStack = ToggleStack;
export const PancakeInput = ToggleInput;
export const PancakeLabel = ToggleLabel;
