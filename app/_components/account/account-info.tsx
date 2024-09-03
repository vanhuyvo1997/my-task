import Image from "next/image";
import LimitedText from "../layouts/limited-text";
import DefaultAvatar from "../../_images/logo.png"
import { User } from "next-auth";
import LogoutButton from "./logout-button";


export default async function AccountInfo({ user }: Readonly<{ user: User }>) {
    return <div className="w-full bg-white rounded-md px-2 py-4 shadow-sm flex items-center justify-between">
        <Image className="rounded-full" src={!user.image ? DefaultAvatar : user.image}
            alt="avatar"
            width={50}
            height={50}
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