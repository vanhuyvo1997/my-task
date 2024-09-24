import Profile from "@/app/_components/account/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile"
}

export default function ProfilePage() {
    return <Profile />
}