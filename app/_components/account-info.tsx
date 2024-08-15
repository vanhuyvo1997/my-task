import Image from "next/image";
import Button from "./button";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import LimitedText from "./limited-text";
import DefaultAvatar from "../_images/logo.png"
import { User } from "next-auth";


export default async function AccountInfo({ user }: Readonly<{ user: User }>) {
    return <div className="w-full bg-white rounded-md p-1 shadow-sm flex items-center justify-between">
        <Image className="rounded-full" src={!user.image ? DefaultAvatar : user.image}
            alt="avatar"
            width={50}
            height={50}
        />
        <div className="w-[60%]">
            <LimitedText title={user.name!} className="w-30">
                <b>{user.name}</b></LimitedText>
            <LimitedText title={user.email!} className="w-30 text-sm">
                <i>{user.email}</i>
            </LimitedText>
        </div>
        <form action={async () => {
            'use server'
            await signOut();
        }}>
            <Button className="bg-orange-400" content="Lout out" type="submit" size="sm" />
        </form>
    </div>
}