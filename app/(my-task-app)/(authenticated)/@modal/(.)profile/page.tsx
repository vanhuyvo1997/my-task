"use client"
import Profile from "@/app/component/account/profile";
import DialogContainer from "@/app/component/commons/dialog/dialog-container";

import { useRouter } from "next/navigation";

export default function ProfileModalPage() {
    const router = useRouter();
    return <DialogContainer size="md" onClose={() => router.back()}>
        <Profile />
    </DialogContainer>
}