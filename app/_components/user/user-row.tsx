"use client"
import React, { useState } from "react";
import Avatar from "../account/avatar";
import clsx from "clsx";
import { UserRowData } from "./user-table";

export default function UserRow({ data, className }: Readonly<{ className?: string, data: UserRowData }>) {
    return <tr className={clsx(
        "border-b-[0.5px] border-opacity-20 border-y-black dark:border-gray-700 border-x-transparent hover:bg-hover-background",
        className
    )}>
        <td className="py-2 flex items-center gap-2">
            <span><Avatar selectable={false} diameter="37" avatarUrl={data.avatarUrl} /></span> {data.firstName + " " + data.lastName}
        </td>
        <td className="py-2">{data.email}</td>
        <td className="py-2">{data.numOfTodo}</td>
        <td className="py-2">{data.numOfCompleted}</td>
        <td className="py-2">{data.totalTasks}</td>
        <td className="py-2"><Switcher initialValue={data.enabled} onOn={() => alert("on")} onOff={() => alert("off")} /></td>
    </tr>
}

function Switcher({ onOn, onOff, initialValue }: Readonly<{ onOn?: () => void, onOff?: () => void, initialValue: boolean }>) {
    const [isOn, setIsOn] = useState(initialValue);

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