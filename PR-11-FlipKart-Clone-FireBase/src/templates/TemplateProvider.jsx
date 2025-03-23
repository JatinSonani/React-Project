import React, { createContext } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";


export const TemplateContext = createContext(null);

export const TemplateProvider = ({ children }) => {
    const theme = createTheme(); // Define a theme

    return (
        <TemplateContext.Provider value={{}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </TemplateContext.Provider>
    );
};

export default TemplateProvider;
