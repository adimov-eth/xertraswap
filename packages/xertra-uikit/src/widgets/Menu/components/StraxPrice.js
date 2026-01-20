var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import { XertraRoundIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";
var PriceLink = styled.a(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  svg {\n    transition: transform 0.3s;\n  }\n  :hover {\n    svg {\n      transform: scale(1.2);\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  svg {\n    transition: transform 0.3s;\n  }\n  :hover {\n    svg {\n      transform: scale(1.2);\n    }\n  }\n"])));
// STRAX price display - links to Stratis info
var StraxPrice = function (_a) {
    var straxPriceUsd = _a.straxPriceUsd, cakePriceUsd = _a.cakePriceUsd;
    var price = straxPriceUsd !== null && straxPriceUsd !== void 0 ? straxPriceUsd : cakePriceUsd;
    return price ? (React.createElement(PriceLink, { href: "https://www.coingecko.com/en/coins/stratis", target: "_blank" },
        React.createElement(XertraRoundIcon, { width: "24px", mr: "8px" }),
        React.createElement(Text, { color: "textSubtle", bold: true }, "$".concat(price.toFixed(3))))) : (React.createElement(Skeleton, { width: 80, height: 24 }));
};
// Backwards compatibility export
export var CakePrice = StraxPrice;
export default React.memo(StraxPrice);
var templateObject_1;
