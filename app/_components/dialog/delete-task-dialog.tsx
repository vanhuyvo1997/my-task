import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./confirm-dialog";
import { showNotification } from "@/app/_lib/utils";

export default function DeleteTaskDialog({
    deletingTaskId,
    onClose,
    afterDelete,
    beforeConfirm,
    deleteSuccess,
    afterConfirm,
}: Readonly<{
    onClose?: () => void,
    deletingTaskId: number,
    afterDelete?: () => void,
    beforeConfirm?: () => void,
    deleteSuccess?: () => void,
    afterConfirm?: () => void,
}>) {
    function handleDeleteTask() {
        beforeConfirm && beforeConfirm();
        fetch(process.env.NEXT_PUBLIC_DELETE_USER_TASKS_PROXY_API + '/' + deletingTaskId, {
            method: 'DELETE'
        }).then(response => {
            if (response.status === 204) {
                showNotification('success', 'The task has been removed successfully.');
                deleteSuccess && deleteSuccess();
            } else if (response.status === 404) {
                showNotification('warning', "The task doesn't exist.")
                deleteSuccess && deleteSuccess();
            } else {
                showNotification('error', 'Something went wrong. Could delete task.');
            }
        }).catch(error => console.error(error)).finally(afterDelete);
        afterConfirm && afterConfirm();
    }
    return <ConfirmDialog
        onClose={(e) => onClose && onClose()}
        onConfirm={handleDeleteTask}
    >
        <div>
            <TrashIcon className="m-auto" height={60} width={60} />
            <p className="text-center">The task will be delete <b>permanently</b>.<br /> Are you sure?</p>
        </div>
    </ConfirmDialog>
}