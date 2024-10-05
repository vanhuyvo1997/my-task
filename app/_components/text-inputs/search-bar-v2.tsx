"use client"

import clsx from "clsx"
import TextInput from "./text-input"
import Button from "../buttons/button"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const searchQueryKey = "query";

export default function SearchBar({ className, placeholder = "Search..." }: Readonly<{ className?: string, placeholder?: string }>) {
    const pathname = usePathname();
    const searParams = useSearchParams();
    const searchTerm = searParams.get(searchQueryKey) ?? '';
    const { replace } = useRouter();

    function handleChangeSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeSearchQuery(e.target.value);
    }

    function handleChangeSearchQuery(newQuery: string) {
        const params = new URLSearchParams(searParams);
        if (newQuery) {
            params.set(searchQueryKey, newQuery);
        } else {
            params.delete(searchQueryKey);
        }
        replace(pathname + "?" + params.toString());
    }


    return <div className={clsx(
        "flex border-b-2 border-solid rounded-sm border-orange-400",
        className,
    )} onSubmit={e => e.preventDefault()}>
        <TextInput
            onChange={handleChangeSearchTerm}
            onClearText={() => { handleChangeSearchQuery("") }}
            placeholder={placeholder}
            className="outline-none rounded-r-none bg-transparent shadow-none"
            value={searchTerm}
            defaultValue={searchTerm}
        />
        <Button disabled className="rounded-l-none bg-transparent shadow-none"><MagnifyingGlassIcon height={20} width={20} /></Button>
    </div>
}