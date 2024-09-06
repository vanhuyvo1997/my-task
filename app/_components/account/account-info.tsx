import Image from "next/image";
import LimitedText from "../layouts/limited-text";
import DefaultAvatar from "../../_images/logo-light.png"
import { User } from "next-auth";
import LogoutButton from "./logout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CommonLink from "../layouts/common-link";


export default async function AccountInfo() {
    const session = await auth();

    if (!session) {
        return <div>Your are unauthenticated. Please <CommonLink href="/login">login.</CommonLink></div>
    }

    const user = session.user!;

    return <div className="w-full bg-account-info-background-light dark:bg-account-info-background-dark rounded-md px-2 py-4 shadow-sm flex items-center justify-between">
        <Image className="rounded-full" src={!user.image ? DefaultAvatar : user.image}
            alt="avatar"
            width={50}
        />
        <div className="basis-[225px]">
            <LimitedText title={user.name!} className="w-30">
                <b>{user.name}</b></LimitedText>
            <LimitedText title={user.email!} className="w-30 text-sm">
                <i>{user.email}</i>
            </LimitedText>
        </div>
        <LogoutButton />
    </div>
}