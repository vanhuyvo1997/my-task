'use client'
import Avatar from "@/app/_components/account/avatar";
import OneLineLimitedText from "@/app/_components/layouts/limited-text";
import { useSession } from "next-auth/react";



export default function ProfilePage() {
    const session = useSession();
    const user = session.data?.user;
    return <div className="py-4 px-4 rounded-md bg-[#888888]">
        <div className="py-4">
            <div className="w-fit h-fit mx-auto">
                <Avatar diameter="200" />
            </div>
        </div>
        <div className="flex flex-col gap-5 mx-auto w-full items-center">
            <div className="text-3xl w-fit text-center">{user?.name}</div>
            <div className="max-w-full text-xl p-2">
                <OneLineLimitedText title={user?.email ?? ''} className="w-full"><i><b>Email: </b>{user?.email}</i></OneLineLimitedText>
                <i><b>Role:</b> {user?.role}</i>
            </div>
        </div>
    </div>
}