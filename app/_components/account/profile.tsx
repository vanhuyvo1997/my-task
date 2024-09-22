'use client'
import { useUserContext } from "@/app/_context/user-context";
import Avatar from "./avatar";
import OneLineLimitedText from "../layouts/limited-text";
import ProfileSkeleton from "../skeletons/profile-skeleton";

export default function Profile() {
    const user = useUserContext();

    if (!user) {
        return <ProfileSkeleton />
    }
    const fullName = user?.firstName + " " + user?.lastName;
    return <div className="py-4 px-4 rounded-md bg-dialog-background-light dark:bg-dialog-background-dark">
        <div className="py-4">
            <div className="w-fit h-fit mx-auto">
                <Avatar diameter="200" avatarUrl={user?.avatarUrl} />
            </div>
        </div>
        <div className="flex flex-col gap-5 mx-auto w-full items-center">
            <div className="text-3xl w-fit text-center"><b>{fullName}</b></div>
            <div className="max-w-full text-xl p-2">
                <OneLineLimitedText title={user?.email ?? ''} className="w-full"><b>Email:{' '}</b><i>{user?.email}</i></OneLineLimitedText>
                <b>Role:</b>{' '} <i>{user?.role}</i>
            </div>
        </div>
    </div>
}