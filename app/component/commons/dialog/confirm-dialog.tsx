import { useEffect } from "react";
import DialogContainer from "./dialog-container";
import PrimaryButton from "../buttons/primary-button";

export default function ConfirmDialog({
    onClose,
    onConfirm,
    children,
    icon,
}: Readonly<{
    onClose?: () => void,
    children: React.ReactNode,
    onConfirm: () => void;
    icon?: React.ReactNode;
}>) {

    useEffect(() => {
        function handlePressEnter(this: Window, ev: KeyboardEvent) {
            if (ev.key === 'Enter') {
                onConfirm();
            }
        }
        window.addEventListener('keypress', handlePressEnter);
        return () => {
            window.removeEventListener('keypress', handlePressEnter)
        }
    }, [onConfirm]);

    return <DialogContainer onClose={onClose}>
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); onConfirm() }}>
            <div className="py-4 flex flex-col items-center gap-3">
                {icon}
                {children}
            </div>
            <div className="flex justify-around">
                <PrimaryButton className="bg-gray-600" onClick={onClose}>No</PrimaryButton>
                <PrimaryButton type="submit" title="Enter" className="bg-orange-500">Yes</PrimaryButton>
            </div>
        </form>
    </DialogContainer>
}



