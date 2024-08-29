import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import TaskIcon, { IconStatus } from "./task-icon";
import clsx from "clsx";
import EditTaskForm from "./edit-task-form";

export type TaskStatus = 'checked' | 'unchecked' | 'submitting' | 'editing';

export default function Task({
    status = 'unchecked',
    name,
    onCheck,
    highlighted,
    onDelete,
    onStartEditing,
    onCancelEditing,
    disabled,
}: Readonly<{
    status: TaskStatus,
    name: string,
    onCheck?: React.MouseEventHandler<HTMLButtonElement>,
    highlighted?: boolean,
    onDelete?: React.MouseEventHandler<HTMLButtonElement>,
    onStartEditing?: React.MouseEventHandler<HTMLButtonElement>,
    onCancelEditing?: React.MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
}>) {
    const isEditing = status === 'editing'

    let iconStatus: IconStatus = 'unchecked';
    if (status === 'checked') {
        iconStatus = 'checked';
    } else if (status === 'submitting') {
        iconStatus = 'busy';
    }


    return <div className={clsx(
        "bg-slate-700 rounded-md p-1 flex items-center justify-between gap-2 text-white",
        !disabled && 'hover:opacity-90',
        highlighted && "animate-pulse",

    )}>
        {
            isEditing ? <EditTaskForm originName={name} onCancel={onCancelEditing} /> : <>
                <div className="flex items-center gap-2 w-full">
                    <TaskIcon disabled={status === 'submitting'} status={iconStatus} onClick={onCheck} />
                    <span>{name}</span>
                </div>
                <div className="flex">
                    <Button onClick={onStartEditing} disabled={disabled} size="sm" ><PencilSquareIcon height={20} width={20} /></Button>
                    <Button disabled={disabled} size="sm" onClick={onDelete} ><TrashIcon height={20} width={20} /></Button>
                </div>
            </>
        }
    </div>
}