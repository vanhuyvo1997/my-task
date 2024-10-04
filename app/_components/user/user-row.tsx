"use client"
import React, { useState } from "react";
import Avatar from "../account/avatar";
import clsx from "clsx";

export default function UserRow({ className }: Readonly<{ className?: string }>) {
    return <tr className={clsx(
        "border-b-[0.5px] border-opacity-20 border-y-black dark:border-gray-700 border-x-transparent hover:bg-hover-background",
        className
    )}>
        <td className="py-2 flex items-center gap-2">
            <Avatar diameter="35" />    Võ Văn Huy
        </td>
        <td className="py-2">vanhuyvo@gmail.com</td>
        <td className="py-2">21</td>
        <td className="py-2">200</td>
        <td className="py-2">221</td>
        <td className="py-2"><Switcher onOn={() => alert("on")} onOff={() => alert("off")} /></td>
    </tr>
}

function Switcher({ onOn, onOff }: Readonly<{ onOn?: () => void, onOff?: () => void }>) {
    const [isOn, setIsOn] = useState(true);

    function handleToggleSatus() {
        const nextState = !isOn;
        if (nextState === true) {
            onOn && onOn();
        } else {
            onOff && onOff();
        }
        setIsOn(nextState);
    }

    return <div className="w-8 bg-gray-300 h-4 rounded-full relative">
        <button onClick={handleToggleSatus} className={clsx(
            "h-5 w-5  rounded-full absolute top-1/2 -translate-y-1/2",
            isOn && "bg-green-500 right-0 hover:bg-green-300",
            !isOn && "bg-gray-500 left-0 hover:bg-gray-400"
        )}>
        </button>
    </div>
}