'use client'

import { SearchTermContext, SetSearchTermContext, useSyncUrlParam } from "../context/search-tasks-context";

export default function SearchTasksContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [searchTerm, handleSearchTermChange] = useSyncUrlParam('query');

    return <SearchTermContext.Provider value={searchTerm}>
        <SetSearchTermContext.Provider value={handleSearchTermChange}>
            {children}
        </SetSearchTermContext.Provider>
    </SearchTermContext.Provider>
}