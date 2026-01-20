import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

// Xertra X logo icon (small version for mobile/collapsed menu)
const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <defs>
        <linearGradient id="xertra_icon_gradient" x1="2.1" y1="5.5" x2="17.5" y2="30.7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38023B"/>
          <stop offset="0.33" stopColor="#A288E3"/>
          <stop offset="0.59" stopColor="#BBD5ED"/>
          <stop offset="0.80" stopColor="#CEFDFF"/>
          <stop offset="1" stopColor="#CCFFCB"/>
        </linearGradient>
      </defs>
      {/* Xertra X icon scaled to 32x32 */}
      <path
        d="M17.5547 17.7959L25.3139 23.8975H19.7118L14.5273 18.9361L6.02344 25H0L32.0328 5L17.5547 17.7959ZM12.1055 17.9941L3.94531 11.2051H9.48438L14.0547 15.7646L30.4062 5L12.1055 17.9941Z"
        fill="url(#xertra_icon_gradient)"
      />
    </Svg>
  );
};

export default Icon;
