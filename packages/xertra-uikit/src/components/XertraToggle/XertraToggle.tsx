import React from "react";
import { ToggleStack, ToggleInput, ToggleLabel } from "./StyledXertraToggle";
import { XertraToggleProps, scales } from "./types";

// Simplified toggle without pancake visuals
const XertraToggle: React.FC<XertraToggleProps> = ({ checked, scale = scales.MD, ...props }) => (
  <ToggleStack scale={scale}>
    <ToggleInput id={props.id || "xertra-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <ToggleLabel scale={scale} checked={checked} htmlFor={props.id || "xertra-toggle"}>
      <div className="handle" />
    </ToggleLabel>
  </ToggleStack>
);

XertraToggle.defaultProps = {
  scale: scales.MD,
};

export default XertraToggle;
