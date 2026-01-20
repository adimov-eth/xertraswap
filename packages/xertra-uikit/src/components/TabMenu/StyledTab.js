var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from "styled-components";
var StyledTab = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-flex;\n  justify-content: center;\n  cursor: pointer;\n  border: 0;\n  outline: 0;\n  flex-grow: 1;\n  padding: 8px;\n  border-radius: 16px 16px 0 0;\n  color: ", ";\n  background-color: ", ";\n\n  ", " {\n    flex-grow: 0;\n    padding: 8px 12px;\n  }\n"], ["\n  display: inline-flex;\n  justify-content: center;\n  cursor: pointer;\n  border: 0;\n  outline: 0;\n  flex-grow: 1;\n  padding: 8px;\n  border-radius: 16px 16px 0 0;\n  color: ", ";\n  background-color: ", ";\n\n  ", " {\n    flex-grow: 0;\n    padding: 8px 12px;\n  }\n"])), function (_a) {
    var theme = _a.theme, color = _a.color;
    return theme.colors[color];
}, function (_a) {
    var theme = _a.theme, bgColor = _a.bgColor;
    return theme.colors[bgColor];
}, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
});
export default StyledTab;
var templateObject_1;
