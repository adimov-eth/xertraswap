import React from "react";
import { useTheme } from "styled-components";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  const theme = useTheme();
  const primaryColor = theme.isDark ? "#2A2C2E" : "#e9eaeb";
  const secondaryColor = theme.isDark ? "#4A4D50" : "#bdc2c4";

  return (
    <Svg viewBox="0 0 32 32" {...props}>
      {/* Circle background */}
      <circle cx="16" cy="16" r="16" fill={primaryColor} />
      {/* Head */}
      <circle cx="16" cy="12" r="5" fill={secondaryColor} />
      {/* Body/shoulders */}
      <path
        d="M16 19c-5.523 0-10 3.477-10 8v5h20v-5c0-4.523-4.477-8-10-8z"
        fill={secondaryColor}
      />
    </Svg>
  );
};

export default Icon;
