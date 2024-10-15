import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./confirm-dialog";

export default function DeleteTaskDialog({
    onConfirm,
    onClose,
}: Readonly<{
    onClose?: () => void,
    onConfirm: () => void,
}>) {
    return <ConfirmDialog
        onClose={onClose}
        onConfirm={onConfirm}
        icon={<TrashIcon className="m-auto" height={60} width={60} />}
    >
        <p className="text-center">The task will be delete <b>permanently</b>.<br /> Are you sure?</p>
    </ConfirmDialog>
}