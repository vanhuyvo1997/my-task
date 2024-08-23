import Button from "../button";
import DialogContainer from "./dialog-container";

export default function ConfirmDialog({
    onClose,
    children
}: Readonly<{
    onClose: React.MouseEventHandler<HTMLElement>,
    children: React.ReactNode
}>) {
    return <DialogContainer onClose={onClose}>
        <div className="flex flex-col gap-4">
            <div className="py-4">
                {children}
            </div>
            <div className="flex justify-around">
                <Button className="bg-gray-600" onClick={onClose}>No</Button>
                <Button className="bg-orange-500">Yes</Button>
            </div>
        </div>
    </DialogContainer>
}