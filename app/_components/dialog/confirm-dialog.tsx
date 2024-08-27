import Button from "../button";
import DialogContainer from "./dialog-container";

export default function ConfirmDialog({
    onClose,
    onConfirm,
    children
}: Readonly<{
    onClose: React.MouseEventHandler<HTMLElement>,
    children: React.ReactNode,
    onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}>) {
    return <DialogContainer onClose={onClose}>
        <div className="flex flex-col gap-4">
            <div className="py-4">
                {children}
            </div>
            <div className="flex justify-around">
                <Button className="bg-gray-600" onClick={onClose}>No</Button>
                <Button type="submit" className="bg-orange-500" onClick={onConfirm}>Yes</Button>
            </div>
        </div>
    </DialogContainer>
}

