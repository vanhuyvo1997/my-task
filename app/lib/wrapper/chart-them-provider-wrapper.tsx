"use client"
import { createTheme, ThemeProvider } from "@mui/material";
import { useDarkModeContext } from "../context/dark-mode-context";


export default function ChartThemeProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const isDarkMode = useDarkModeContext();
    return <ThemeProvider theme={createTheme({ palette: { mode: isDarkMode ? "dark" : "light" } })}>
        {children}
    </ThemeProvider>
}