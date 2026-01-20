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
import { useTheme } from "styled-components";
import Svg from "../Svg";
var Icon = function (props) {
    var theme = useTheme();
    var primaryColor = theme.isDark ? "#2A2C2E" : "#e9eaeb";
    var secondaryColor = theme.isDark ? "#4A4D50" : "#bdc2c4";
    return (React.createElement(Svg, __assign({ viewBox: "0 0 32 32" }, props),
        React.createElement("circle", { cx: "16", cy: "16", r: "16", fill: primaryColor }),
        React.createElement("circle", { cx: "16", cy: "12", r: "5", fill: secondaryColor }),
        React.createElement("path", { d: "M16 19c-5.523 0-10 3.477-10 8v5h20v-5c0-4.523-4.477-8-10-8z", fill: secondaryColor })));
};
export default Icon;
