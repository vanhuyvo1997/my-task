'use client'
import ModalContainer from "@/app/_components/dialog/modal-container";
import { useRouter } from "next/navigation";
import LoginPage from "../(auth)/login/page";


export default function LoginModal() {
    const router = useRouter();
    return <ModalContainer size="lg" onClose={() => { router.push('/') }}>
        <LoginPage />
    </ModalContainer>
}