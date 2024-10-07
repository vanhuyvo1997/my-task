"use client"
import React from "react";
import Avatar from "../account/avatar";
import clsx from "clsx";
import { changeUserStatusAction } from "@/app/_actions/user-action";
import { UserDetailsData } from "@/app/_dal/users-dal";
import { useFormStatus } from "react-dom";
import OneLineLimitedText from "../layouts/limited-text";

export default function UserRow({ data, className }: Readonly<{ className?: string, data: UserDetailsData }>) {
    return <tr className={clsx(
        "border-b-[0.5px] border-opacity-20 border-y-black dark:border-gray-700 border-x-transparent hover:bg-hover-background",
        className
    )}>
        <td className="py-2 flex items-center gap-2">
            <span><Avatar selectable={false} diameter="37" avatarUrl={data.avatarUrl} /></span> {data.firstName + " " + data.lastName}
        </td>
        <td className="py-2"><OneLineLimitedText title={data.email}>{data.email}</OneLineLimitedText></td>
        <td className="py-2">{data.numOfTodo}</td>
        <td className="py-2">{data.numOfCompleted}</td>
        <td className="py-2">{data.totalTasks}</td>
        <td className="py-2">
            <form action={async e => {
                await changeUserStatusAction(data.id, e.get("switcher") == "on" ? "disabled" : "enabled");
            }}>
                <Switcher name="switcher" value={data.enabled ? "on" : "off"} />
            </form>
        </td>
    </tr>
}

function Switcher({ value, name = "switcher" }: Readonly<{ value: "on" | "off", name?: string }>) {
    const { pending } = useFormStatus();
    return <div className="w-8 bg-gray-300 h-4 rounded-full relative">
        <button type="submit" value={value} name="switcher" className={clsx(
            "h-5 w-5  rounded-full absolute top-1/2 -translate-y-1/2",
            value === "on" ? "bg-green-500 right-0 hover:bg-green-300" : "bg-gray-500 left-0 hover:bg-gray-400",
            pending && "animate-pulse"
        )}>
        </button>
    </div>
}