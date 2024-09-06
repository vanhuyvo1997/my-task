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
    return <DialogContainer onClose={onClose}>
        <div className="flex flex-col gap-4">
            <div className="py-4 flex flex-col items-center gap-3">
                {icon}
                {children}
            </div>
            <div className="flex justify-around">
                <Button className="bg-gray-600" onClick={onClose}>No</Button>
                <Button type="submit" className="bg-orange-500" onClick={onConfirm}>Yes</Button>
            </div>
        </div>
    </DialogContainer>
}

