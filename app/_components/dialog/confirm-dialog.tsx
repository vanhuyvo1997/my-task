import { useEffect } from "react";
import Button from "../buttons/button";
import DialogContainer from "./dialog-container";

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
                <Button className="bg-gray-600" onClick={onClose}>No</Button>
                <Button type="submit" className="bg-orange-500">Yes</Button>
            </div>
        </form>
    </DialogContainer>
}



