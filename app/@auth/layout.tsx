'use client'
import { useRouter } from "next/navigation";
import ModalContainer from "../_components/dialog/modal-container";

export default function AuthSlotLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    return <ModalContainer onClose={() => { router.back() }} size="lg">
        {children}
    </ModalContainer>
}