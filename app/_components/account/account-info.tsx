"use client"

import OneLineLimitedText from "../layouts/limited-text";
import LogoutButton from "./logout-button";
import Link from "next/link";
import { useUserContext } from "@/app/_context/user-context";
import Avatar from "./avatar";

export default function AccountInfo() {
    const user = useUserContext();

    if (!user) {
        return <>Loading...</>
    }
    const fullname = user.firstName + " " + user.lastName;

    return <div className="w-full bg-account-info-background-light dark:bg-account-info-background-dark
     rounded-md px-2 py-4 shadow-sm flex items-center justify-between">
        <Avatar diameter="50" avatarUrl={user.avatarUrl} />
        <div className="w-[220px]">
            <OneLineLimitedText title={fullname} >
                <Link href="/profile"><b>{fullname}</b></Link>
            </OneLineLimitedText>
            <OneLineLimitedText title={user.email!} >
                <i>{user.email}</i>
            </OneLineLimitedText>
        </div>
        <LogoutButton />
    </div>
}