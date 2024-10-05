"use client"

import { useContext, useEffect } from "react";
import TextInput from "./text-input";
import Button from "../buttons/button";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { SearchTermContext, SetSearchTermContext } from "../../_context/search-tasks-context";

export default function SearchBar({ className, placeholder = "Search..." }: Readonly<{ className?: string, placeholder?: string }>) {
    const searchTerm = useContext(SearchTermContext);
    const setSearchTerm = useContext(SetSearchTermContext);

    return <form className={clsx(
        "flex border-b-2 border-solid rounded-sm border-orange-400",
        className,
    )} onSubmit={e => e.preventDefault()}>
        <TextInput
            onChange={(e) => setSearchTerm(e.target.value)}
            onClearText={(e) => setSearchTerm('')}
            placeholder={placeholder}
            className="outline-none rounded-r-none bg-transparent shadow-none"
            value={searchTerm}
            defaultValue={searchTerm}
        />
        <Button disabled className="rounded-l-none bg-transparent shadow-none"><MagnifyingGlassIcon height={20} width={20} /></Button>
    </form>
}