import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { light } from "./theme";
/* eslint-disable import/prefer-default-export */
export var renderWithTheme = function (component, theme) {
    if (theme === void 0) { theme = light; }
    return render(React.createElement(ThemeProvider, { theme: theme }, component));
};
