export var breakpointMap = {
    xs: 370,
    sm: 576,
    md: 852,
    lg: 968,
    xl: 1080,
};
var breakpoints = Object.values(breakpointMap).map(function (breakpoint) { return "".concat(breakpoint, "px"); });
var mediaQueries = {
    xs: "@media screen and (min-width: ".concat(breakpointMap.xs, "px)"),
    sm: "@media screen and (min-width: ".concat(breakpointMap.sm, "px)"),
    md: "@media screen and (min-width: ".concat(breakpointMap.md, "px)"),
    lg: "@media screen and (min-width: ".concat(breakpointMap.lg, "px)"),
    xl: "@media screen and (min-width: ".concat(breakpointMap.xl, "px)"),
    nav: "@media screen and (min-width: ".concat(breakpointMap.lg, "px)"),
};
// Xertra minimal shadows
export var shadows = {
    level1: "0px 1px 4px rgba(0, 0, 0, 0.1)",
    active: "0px 0px 0px 1px #BDBDFF, 0px 0px 4px 4px rgba(189, 189, 255, 0.2)",
    success: "0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)",
    warning: "0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)",
    focus: "0px 0px 0px 1px #BDBDFF, 0px 0px 0px 4px rgba(189, 189, 255, 0.3)",
    inset: "inset 0px 2px 2px -1px rgba(0, 0, 0, 0.1)",
};
var spacing = [0, 4, 8, 16, 24, 32, 48, 64];
// Xertra uses 8px border radius
var radii = {
    small: "4px",
    default: "8px",
    card: "12px",
    circle: "50%",
};
var zIndices = {
    dropdown: 10,
    modal: 100,
};
export default {
    siteWidth: 1200,
    breakpoints: breakpoints,
    mediaQueries: mediaQueries,
    spacing: spacing,
    shadows: shadows,
    radii: radii,
    zIndices: zIndices,
};
