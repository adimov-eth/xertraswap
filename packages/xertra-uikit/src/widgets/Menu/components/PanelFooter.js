var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import { CogIcon } from "../../../components/Svg";
import IconButton from "../../../components/Button/IconButton";
import StraxPrice from "./StraxPrice";
import SocialLinks from "./SocialLinks";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: none;\n  padding: 8px 4px;\n  background-color: ", ";\n  border-top: solid 2px rgba(133, 133, 133, 0.1);\n"], ["\n  flex: none;\n  padding: 8px 4px;\n  background-color: ", ";\n  border-top: solid 2px rgba(133, 133, 133, 0.1);\n"])), function (_a) {
    var theme = _a.theme;
    return theme.nav.background;
});
var SocialEntry = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 42px;\n  padding: 0 16px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 42px;\n  padding: 0 16px;\n"])));
var PanelFooter = function (_a) {
    var isPushed = _a.isPushed, pushNav = _a.pushNav, cakePriceUsd = _a.cakePriceUsd;
    if (!isPushed) {
        return (React.createElement(Container, null,
            React.createElement(IconButton, { variant: "text", onClick: function () { return pushNav(true); } },
                React.createElement(CogIcon, null))));
    }
    return (React.createElement(Container, null,
        React.createElement(SocialEntry, null,
            React.createElement(StraxPrice, { cakePriceUsd: cakePriceUsd }),
            React.createElement(SocialLinks, null))));
};
export default PanelFooter;
var templateObject_1, templateObject_2;
