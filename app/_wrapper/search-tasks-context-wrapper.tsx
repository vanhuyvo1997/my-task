'use client'
import { useState } from "react";
import { SearchTermContext, SetSearchTermContext } from "../_context/search-tasks-context";

export default function SearchTasksContextWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const [searchTerm, setSearchTerm] = useState('');
    return <SearchTermContext.Provider value={searchTerm}>
        <SetSearchTermContext.Provider value={setSearchTerm}>
            {children}
        </SetSearchTermContext.Provider>
    </SearchTermContext.Provider>
}