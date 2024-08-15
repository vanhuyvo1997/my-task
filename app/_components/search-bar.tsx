"use client"

import { useState } from "react";
import TextInput from "./text-input";
import Button from "./button";
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SerchBar() {

    const [searchValue, setSearchValue] = useState('');
    return <form className="flex border-2 border-solid border-blue-500 rounded-lg">
        <TextInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClearText={(e) => setSearchValue('')}
            placeholder="Search..."
            className="outline-none rounded-r-none bg-transparent"
        />
        <Button className="rounded-l-none bg-blue-500"><MagnifyingGlassIcon height={20} width={20} /></Button>
    </form>
}