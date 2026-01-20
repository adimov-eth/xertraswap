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
// Xertra X icon in a circular container (used for price display)
var Icon = function (props) {
    return (React.createElement(Svg, __assign({ viewBox: "0 0 90 90" }, props),
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: "xertra_round_gradient", x1: "15", y1: "12", x2: "75", y2: "78", gradientUnits: "userSpaceOnUse" },
                React.createElement("stop", { stopColor: "#38023B" }),
                React.createElement("stop", { offset: "0.33", stopColor: "#A288E3" }),
                React.createElement("stop", { offset: "0.59", stopColor: "#BBD5ED" }),
                React.createElement("stop", { offset: "0.80", stopColor: "#CEFDFF" }),
                React.createElement("stop", { offset: "1", stopColor: "#CCFFCB" }))),
        React.createElement("circle", { cx: "45", cy: "45", r: "45", fill: "#1A1C1D" }),
        React.createElement("g", { transform: "translate(20, 22) scale(1.2)" },
            React.createElement("path", { d: "M22.5059 17.7959L32.4434 28.8975H25.2637L18.6094 21.5361L7.71191 32H0L41.042 0L22.5059 17.7959ZM15.5127 17.9941L5.05273 6.20508H12.1445L17.9941 12.7646L38.9141 0L15.5127 17.9941Z", fill: "url(#xertra_round_gradient)" }))));
};
export default Icon;
