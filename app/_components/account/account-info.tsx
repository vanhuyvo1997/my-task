import Image from "next/image";
import OneLineLimitedText from "../layouts/limited-text";
import DefaultAvatar from "../../_images/logo-light.png"

import LogoutButton from "./logout-button";
import { auth } from "@/auth";
import CommonLink from "../layouts/common-link";


export default async function AccountInfo() {
    const session = await auth();

    if (!session) {
        return <div>Your are unauthenticated. Please <CommonLink href="/login">login.</CommonLink></div>
    }

    const user = session.user!;

    return <div className="w-full bg-account-info-background-light dark:bg-account-info-background-dark
     rounded-md px-2 py-4 shadow-sm flex items-center justify-between">
        <Image className="rounded-full" src={!user.image ? DefaultAvatar : user.image}
            alt="avatar"
            width={50}
        />
        <div className="w-[220px]">
            <OneLineLimitedText title={user.name!} >
                <b>{user.name}</b>
            </OneLineLimitedText>
            <OneLineLimitedText title={user.email!} >
                <i>{user.email}</i>
            </OneLineLimitedText>
        </div>
        <LogoutButton />
    </div>
}