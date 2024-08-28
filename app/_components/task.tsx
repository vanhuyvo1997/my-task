import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import TaskIcon, { IconStatus } from "./task-icon";
import clsx from "clsx";
import EditTaskForm from "./edit-task-form";

export type TaskStatus = 'checked' | 'unchecked' | 'submitting' | 'editting';

export default function Task({
    status = 'unchecked',
    name,
    onCheck,
    highlighted,
    onDelete,
}: Readonly<{
    status: TaskStatus,
    name: string,
    onCheck?: React.MouseEventHandler<HTMLButtonElement>,
    highlighted?: boolean,
    onDelete?: React.MouseEventHandler<HTMLButtonElement>,
}>) {

    const isDisabled = status === 'submitting';
    const isEditting = status === 'editting';

    let iconStatus: IconStatus = 'unchecked';
    if (status === 'checked') {
        iconStatus = 'checked';
    } else if (status === 'submitting') {
        iconStatus = 'busy';
    } else if (status === 'editting') {
        iconStatus = 'disabled'
    }


    return <div className={clsx(
        "bg-slate-700 rounded-md p-1 flex items-center justify-between gap-2 text-white",
        !isDisabled && 'hover:opacity-90',
        highlighted && "animate-pulse",
    )}>
        <div className="flex items-center gap-2 w-full">
            <TaskIcon status={iconStatus} onClick={onCheck} />
            {isEditting ? <EditTaskForm originName={name} /> : <span>{name}</span>}
        </div>
        {!isEditting && <div className="flex">
            <Button disabled={isDisabled} size="sm" ><PencilSquareIcon height={20} width={20} /></Button>
            <Button disabled={isDisabled} size="sm" onClick={onDelete} ><TrashIcon height={20} width={20} /></Button>
        </div>}
    </div>
}