import Image from "next/image";
import Button from "./button";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import LimitedText from "./limited-text";
import DefaultAvatar from "../_images/logo.png"
import { User } from "next-auth";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";


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
        <form action={async () => {
            'use server'
            await signOut();
        }}>
            <Button title="Log out" className="bg-orange-400" type="submit" size="sm" >
                <ArrowLeftStartOnRectangleIcon className="rotate-180" height={20} width={20} />
            </Button>
        </form>
    </div>
}