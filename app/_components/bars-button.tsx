"use client"

import { Bars3Icon } from "@heroicons/react/20/solid";
import Button from "./button";

export default function BarsButton({
    toggleElementId,
    className,
}: Readonly<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    toggleElementId: string,
    className?: string
}>) {
    return <Button className={className + " lg:hidden"} onClick={() => document.getElementById(toggleElementId)!.classList.toggle('hidden')} size="sm" >
        <Bars3Icon height={25} width={25} />
    </Button>
}