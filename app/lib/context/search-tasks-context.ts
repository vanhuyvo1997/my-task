import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useCallback, useContext, useState } from 'react';

export const SearchTermContext = createContext<string>('');
export const SetSearchTermContext = createContext<(newSearchTerm: string) => void>(() => { });

export function useSearchTermContext() {
    return useContext(SearchTermContext);
}

export function useSyncUrlParam(urlParamKey: string): [searchTerm: string, setSearchTerm: (newSearchTerm: string) => void] {
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get(urlParamKey) ?? '');
    const pathName = usePathname();
    const { replace } = useRouter();

    const setSearchTerm = useCallback(function (newSearchTerm: string) {
        const urlSearchParams = new URLSearchParams(searchParams);
        if (newSearchTerm) {
            urlSearchParams.set(urlParamKey, newSearchTerm);
        } else {
            urlSearchParams.delete(urlParamKey);
        }
        replace(pathName + '?' + urlSearchParams.toString());
        setValue(newSearchTerm);
    }, [pathName, replace, searchParams, urlParamKey]);

    return [value, setSearchTerm]
}