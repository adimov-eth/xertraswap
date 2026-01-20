var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from "styled-components";
import { scales } from "./types";
var scaleKeyValues = {
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
var getScale = function (property) { return function (_a) {
    var _b = _a.scale, scale = _b === void 0 ? scales.MD : _b;
    return scaleKeyValues[scale][property];
}; };
export var ToggleStack = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n\n  &:label:before {\n    content: none;\n  }\n\n  .handle {\n    background: ", ";\n    border-radius: 50%;\n    width: ", ";\n    height: ", ";\n    position: absolute;\n    transition: 0.3s ease;\n    top: 4px;\n    left: 4px;\n    box-shadow: 0 ", " 0 ", "\n      ", ";\n  }\n"], ["\n  position: relative;\n  display: inline-block;\n\n  &:label:before {\n    content: none;\n  }\n\n  .handle {\n    background: ", ";\n    border-radius: 50%;\n    width: ", ";\n    height: ", ";\n    position: absolute;\n    transition: 0.3s ease;\n    top: 4px;\n    left: 4px;\n    box-shadow: 0 ", " 0 ", "\n      ", ";\n  }\n"])), function (_a) {
    var _b, _c;
    var theme = _a.theme;
    return ((_b = theme.xertraToggle) === null || _b === void 0 ? void 0 : _b.handleBackground) || ((_c = theme.pancakeToggle) === null || _c === void 0 ? void 0 : _c.handleBackground) || theme.colors.card;
}, getScale("handleSize"), getScale("handleSize"), getScale("handleThickness"), getScale("handleThickness"), function (_a) {
    var _b, _c;
    var theme = _a.theme;
    return ((_b = theme.xertraToggle) === null || _b === void 0 ? void 0 : _b.handleShadow) || ((_c = theme.pancakeToggle) === null || _c === void 0 ? void 0 : _c.handleShadow) || theme.colors.textDisabled;
});
export var ToggleInput = styled.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 40px;\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  width: 40px;\n\n  &:focus + label {\n    box-shadow: ", ";\n  }\n\n  &:checked + label .handle {\n    transform: translateX(", ");\n  }\n"], ["\n  height: 40px;\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  width: 40px;\n\n  &:focus + label {\n    box-shadow: ", ";\n  }\n\n  &:checked + label .handle {\n    transform: translateX(", ");\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.shadows.focus;
}, getScale("travelDistance"));
export var ToggleLabel = styled.label(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background: ", ";\n  box-shadow: ", ";\n  display: inline-block;\n  border-radius: 50px;\n  position: relative;\n  transition: all 0.3s ease;\n  transform-origin: 20% center;\n  cursor: pointer;\n"], ["\n  width: ", ";\n  height: ", ";\n  background: ", ";\n  box-shadow: ", ";\n  display: inline-block;\n  border-radius: 50px;\n  position: relative;\n  transition: all 0.3s ease;\n  transform-origin: 20% center;\n  cursor: pointer;\n"])), getScale("toggleWidth"), getScale("toggleHeight"), function (_a) {
    var theme = _a.theme, checked = _a.checked;
    return theme.colors[checked ? "success" : "input"];
}, function (_a) {
    var theme = _a.theme;
    return theme.shadows.inset;
});
// Backwards compatibility exports
export var PancakeStack = ToggleStack;
export var PancakeInput = ToggleInput;
export var PancakeLabel = ToggleLabel;
var templateObject_1, templateObject_2, templateObject_3;
