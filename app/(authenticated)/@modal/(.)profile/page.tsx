"use client"
import Profile from "@/app/_components/account/profile";
import DialogContainer from "@/app/_components/dialog/dialog-container";
import { useRouter } from "next/navigation";

export default function ProfileModalPage() {
    const router = useRouter();
    return <DialogContainer size="md" onClose={() => router.back()}>
        <Profile />
    </DialogContainer>
}