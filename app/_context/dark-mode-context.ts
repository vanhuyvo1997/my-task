import { createContext, useContext } from "react"

export const DarkModeContext = createContext(false);
export function useDarkModeContext() {
    return useContext(DarkModeContext);
}

export const SetDarkModeContext = createContext<((value: boolean) => void)>((a) => { });
export function useSetDarkModeContext() {
    return useContext(SetDarkModeContext);
}