import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./confirm-dialog";

export default function DeleteTaskDialog({ onClose }: Readonly<{ onClose: React.MouseEventHandler<HTMLElement> }>) {
    return <ConfirmDialog
        onClose={onClose}
    >
        <div>
            <TrashIcon className="m-auto" height={60} width={60} />
            <p className="text-center">The task will be delete <b>permanently</b>.<br /> Are you sure?</p>
        </div>
    </ConfirmDialog>
}