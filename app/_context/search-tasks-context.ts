import { createContext, Dispatch, SetStateAction } from 'react';

export const SearchTermContext = createContext<string>('');
export const SetSearchTermContext = createContext<Dispatch<SetStateAction<string>> | null>(null);