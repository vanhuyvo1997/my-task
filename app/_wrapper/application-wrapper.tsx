'use client'

import { ReactNode, useEffect, useState } from "react";
import { DarkModeContext, SetDarkModeContext } from "../_context/dark-mode-context"

export default function ApplicationWrapper({ children }: Readonly<{ children: ReactNode }>) {
    const [isOnDarkMode, setIsOnDarkMode] = useState(false);
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsOnDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsOnDarkMode(false);
        }
    }, []);

    function setDarkMode(value: boolean) {
        if (value) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        } else {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }
        setIsOnDarkMode(value);
    }

    return <DarkModeContext.Provider value={isOnDarkMode}>
        <SetDarkModeContext.Provider value={setDarkMode}>
            {children}
        </SetDarkModeContext.Provider>
    </DarkModeContext.Provider>
}