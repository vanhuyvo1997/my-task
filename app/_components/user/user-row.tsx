"use client"
import React, { useState } from "react";
import Avatar from "../account/avatar";
import clsx from "clsx";
import { UserRowData } from "./user-table";
import { changeUserStatusAction } from "@/app/_actions/user-action";

export default function UserRow({ data, className }: Readonly<{ className?: string, data: UserRowData }>) {
    async function handleDisableUser() {
        changeUserStatusAction(data.id, "disabled");
    }
    async function handleEnableUser() {
        changeUserStatusAction(data.id, "enabled");
    }
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
        <td className="py-2">
            <Switcher value={data.enabled} onOn={handleEnableUser} onOff={handleDisableUser} />
        </td>
    </tr>
}

function Switcher({ onOn, onOff, value }: Readonly<{ onOn?: () => Promise<void>, onOff?: () => Promise<void>, value: boolean }>) {
    async function handleChange() {
        value ? onOff && await onOff() : onOn && await onOn();
    }
    return <div className="w-8 bg-gray-300 h-4 rounded-full relative">
        <button onClick={async () => { handleChange(); }} className={clsx(
            "h-5 w-5  rounded-full absolute top-1/2 -translate-y-1/2",
            value && "bg-green-500 right-0 hover:bg-green-300",
            !value && "bg-gray-500 left-0 hover:bg-gray-400"
        )}>
        </button>
    </div>
}