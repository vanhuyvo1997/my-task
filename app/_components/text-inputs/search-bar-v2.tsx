"use client"

import clsx from "clsx"
import TextInput from "./text-input"
import Button from "../buttons/button"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export const SearchQueryKey = "query";
const SearchPageKey = "page"

export default function SearchBar({ className, placeholder = "Search..." }: Readonly<{ className?: string, placeholder?: string }>) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [query, setQuery] = useState(searchParams.get(SearchQueryKey) ?? '');

    const setSearchQuery = useDebouncedCallback((newQuery: string) => {
        const params = new URLSearchParams(searchParams);
        if (newQuery) {
            params.set(SearchQueryKey, newQuery);
            params.get(SearchPageKey) && params.set(SearchPageKey, '1');
        } else {
            params.delete(SearchQueryKey);
        }
        replace(pathname + "?" + params.toString());
    }, 600);

    function handleChangeSearchQuery(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        setQuery(newValue);
        setSearchQuery(newValue);
    }

    function handleClearSearchQuery() {
        setQuery("");
        setSearchQuery("");
    }

    return <div className={clsx(
        "flex border-b-2 border-solid rounded-sm border-orange-400",
        className,
    )} onSubmit={e => e.preventDefault()}>
        <TextInput
            onChange={handleChangeSearchQuery}
            onClearText={handleClearSearchQuery}
            placeholder={placeholder}
            className="outline-none rounded-r-none bg-transparent shadow-none"
            value={query}
            defaultValue={query}
        />
        <Button disabled className="rounded-l-none bg-transparent shadow-none"><MagnifyingGlassIcon height={20} width={20} /></Button>
    </div>
}