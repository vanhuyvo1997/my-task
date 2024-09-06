import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export const SearchTermContext = createContext<string>('');
export const SetSearchTermContext = createContext<Dispatch<SetStateAction<string>> | null>(null);

export function useSearchTermContext() {
    return useContext(SearchTermContext);
}