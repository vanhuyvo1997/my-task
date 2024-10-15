import Profile from "@/app/component/account/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile"
}

export default function ProfilePage() {
    return <Profile />
}