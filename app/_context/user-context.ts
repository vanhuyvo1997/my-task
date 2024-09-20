import { createContext, useContext } from "react";

export type User = {
    firstName?: string,
    lastName?: string,
    email?: string,
    role?: string,
    avatarUrl?: string
}

export const UserContext = createContext<User | null>(null);
export const RefreshUserContext = createContext<() => void>(() => { });

export function useRefreshUserContext() {
    return useContext(RefreshUserContext);
}

export function useUserContext() {
    return useContext(UserContext);
}