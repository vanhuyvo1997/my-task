import Button from "../button";
import DialogContainer from "./dialog-container";

export default function ConfirmDialog({
    onClose,
    onConfirm,
    children
}: Readonly<{
    onClose: React.MouseEventHandler<HTMLElement>,
    children: React.ReactNode,
    onConfirm: () => void;
}>) {
    return <DialogContainer onClose={onClose}>
        <form className="flex flex-col gap-4" onSubmit={
            e => {
                e.preventDefault();
                onConfirm();
            }}>
            <div className="py-4">
                {children}
            </div>
            <div className="flex justify-around">
                <Button className="bg-gray-600" onClick={onClose}>No</Button>
                <Button type="submit" className="bg-orange-500">Yes</Button>
            </div>
        </form>
    </DialogContainer>
}

