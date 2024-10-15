"use client"

import { Bars3Icon } from "@heroicons/react/20/solid";
import PrimaryButton from "./primary-button";

export function toggleHiddenElementById(toggleElementId: string) {
    document.getElementById(toggleElementId)!.classList.toggle('hidden');
}

export default function BurgerButton({
    toggleElementId,
    className,
}: Readonly<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    toggleElementId: string,
    className?: string
}>) {
    return <PrimaryButton className={className} onClick={() => toggleHiddenElementById(toggleElementId)} size="sm" >
        <Bars3Icon height={25} width={25} />
    </PrimaryButton>
}