"use client"

import { useEffect, useState } from "react";
import TextInput from "./text-input";
import Button from "./button";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";


export default function SearchBar({ className }: Readonly<{ className?: string }>) {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query')?.toString());

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (searchTerm) {
                params.set('query', searchTerm);
            } else {
                params.delete('query');
            }
            replace(`${pathName}?${params.toString()}`);
        }, 500);
        return () => { clearTimeout(timeoutId) }
    }, [pathName, replace, searchParams, searchTerm]);

    return <form className={clsx(
        "flex border-2 border-solid border-blue-500 rounded-lg",
        className,
    )} onSubmit={e => e.preventDefault()}>
        <TextInput
            onChange={(e) => setSearchTerm(e.target.value)}
            onClearText={(e) => setSearchTerm('')}
            placeholder="Search..."
            className="outline-none rounded-r-none bg-transparent"
            value={searchTerm}
        />
        <Button disabled className="rounded-l-none bg-blue-500"><MagnifyingGlassIcon height={20} width={20} /></Button>
    </form>
}