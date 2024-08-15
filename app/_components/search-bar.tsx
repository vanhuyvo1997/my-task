"use client"

import { useState } from "react";
import TextInput from "./text-input";
import Button from "./button";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function SerchBar() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query')?.toString());
    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathName}?${params.toString()}`);
        setSearchTerm(term);
    }
    return <form className="flex border-2 border-solid border-blue-500 rounded-lg">
        <TextInput
            onChange={(e) => handleSearch(e.target.value)}
            onClearText={(e) => handleSearch('')}
            placeholder="Search..."
            className="outline-none rounded-r-none bg-transparent"
            value={searchTerm}
        />
        <Button className="rounded-l-none bg-blue-500"><MagnifyingGlassIcon height={20} width={20} /></Button>
    </form>
}