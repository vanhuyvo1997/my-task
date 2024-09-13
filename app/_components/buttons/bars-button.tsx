"use client"

import { Bars3Icon } from "@heroicons/react/20/solid";
import Button from "./button";

export function toggleHiddenElementById(toggleElementId: string) {
    document.getElementById(toggleElementId)!.classList.toggle('hidden');
}

export default function BarsButton({
    toggleElementId,
    className,
}: Readonly<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    toggleElementId: string,
    className?: string
}>) {
    return <Button className={className} onClick={() => toggleHiddenElementById(toggleElementId)} size="sm" >
        <Bars3Icon height={25} width={25} />
    </Button>
}