import getThemeValue from "./getThemeValue";
var getColor = function (color, theme) {
    return getThemeValue("colors.".concat(color), color)(theme);
};
export default getColor;
