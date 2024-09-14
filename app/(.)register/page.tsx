'use client'
import { useRouter } from "next/navigation";
import ModalContainer from "../_components/dialog/modal-container";
import RegisterPage from "../(auth)/register/page";

export default function RegisterModal() {
    const router = useRouter();
    return <ModalContainer onClose={() => router.push('/')} size="lg">
        <RegisterPage />
    </ModalContainer>
}