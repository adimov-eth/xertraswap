var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import Svg from "../Svg";
// Xertra X logo icon (small version for mobile/collapsed menu)
var Icon = function (props) {
    return (React.createElement(Svg, __assign({ viewBox: "0 0 32 32" }, props),
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: "xertra_icon_gradient", x1: "2.1", y1: "5.5", x2: "17.5", y2: "30.7", gradientUnits: "userSpaceOnUse" },
                React.createElement("stop", { stopColor: "#38023B" }),
                React.createElement("stop", { offset: "0.33", stopColor: "#A288E3" }),
                React.createElement("stop", { offset: "0.59", stopColor: "#BBD5ED" }),
                React.createElement("stop", { offset: "0.80", stopColor: "#CEFDFF" }),
                React.createElement("stop", { offset: "1", stopColor: "#CCFFCB" }))),
        React.createElement("path", { d: "M17.5547 17.7959L25.3139 23.8975H19.7118L14.5273 18.9361L6.02344 25H0L32.0328 5L17.5547 17.7959ZM12.1055 17.9941L3.94531 11.2051H9.48438L14.0547 15.7646L30.4062 5L12.1055 17.9941Z", fill: "url(#xertra_icon_gradient)" })));
};
export default Icon;
