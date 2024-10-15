'use client'

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { DarkModeContext, SetDarkModeContext } from "../context/dark-mode-context"

export default function ApplicationProvider({ children }: Readonly<{ children: ReactNode }>) {
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

    const setDarkMode = useCallback((value: boolean) => {
        if (value) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        } else {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }
        setIsOnDarkMode(value);
    }, []);


    return <DarkModeContext.Provider value={isOnDarkMode}>
        <SetDarkModeContext.Provider value={setDarkMode}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={isOnDarkMode ? 'dark' : 'light'}
                transition={Bounce}
            />
        </SetDarkModeContext.Provider>
    </DarkModeContext.Provider>
}