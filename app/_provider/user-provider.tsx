"use client"
import { RefreshUserContext, User, UserContext } from "../_context/user-context";
import { useCallback, useEffect, useState } from "react";

async function loadUser() {
    const response = await fetch("/api/profiles");
    if (response.ok) {
        return response.json();
    } else throw new Error("Couldn't fetch user");
}

export default function UserPovider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let ignore = false;
        loadUser().then(data => {
            if (!ignore) {
                setUser(data);
            }
        });
        return () => { ignore = true };
    }, []);

    const handleRefreshUser = useCallback(() => {
        loadUser().then(data => {
            setUser(data);
        });
    }, []);

    return <UserContext.Provider value={user}>
        <RefreshUserContext.Provider value={handleRefreshUser}>
            {children}
        </RefreshUserContext.Provider>
    </UserContext.Provider>
}