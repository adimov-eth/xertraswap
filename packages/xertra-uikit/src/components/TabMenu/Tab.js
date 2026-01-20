import React from "react";
import StyledTab from "./StyledTab";
import { Text } from "../Text";
var Tab = function (_a) {
    var _b = _a.isActive, isActive = _b === void 0 ? false : _b, onClick = _a.onClick, children = _a.children;
    return (React.createElement(StyledTab, { onClick: onClick, bgColor: isActive ? "textSubtle" : "input", color: isActive ? "card" : "textSubtle" },
        React.createElement(Text, { fontWeight: 600, color: isActive ? "card" : "textSubtle" }, children)));
};
export default Tab;
