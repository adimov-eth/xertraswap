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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { ToggleStack, ToggleInput, ToggleLabel } from "./StyledXertraToggle";
import { scales } from "./types";
// Simplified toggle without pancake visuals
var XertraToggle = function (_a) {
    var checked = _a.checked, _b = _a.scale, scale = _b === void 0 ? scales.MD : _b, props = __rest(_a, ["checked", "scale"]);
    return (React.createElement(ToggleStack, { scale: scale },
        React.createElement(ToggleInput, __assign({ id: props.id || "xertra-toggle", scale: scale, type: "checkbox", checked: checked }, props)),
        React.createElement(ToggleLabel, { scale: scale, checked: checked, htmlFor: props.id || "xertra-toggle" },
            React.createElement("div", { className: "handle" }))));
};
XertraToggle.defaultProps = {
    scale: scales.MD,
};
export default XertraToggle;
