import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import TaskIcon, { IconStatus } from "./task-icon";
import clsx from "clsx";
import EditTaskForm from "./edit-task-form";
import { TaskData } from "../user/page";

export type TaskStatus = 'checked' | 'unchecked' | 'submitting' | 'editing';

export default function Task({
    id,
    name,
    status,
    createdAt,
    completedAt,
    onCheck,
    highlighted,
    onDelete,
    onStartEditing,
    onCancelEditing,
    disabled,
    taskUIStatus,
    onSubmitChangeName,
}:
    Readonly<
        TaskData
        & {
            onCheck?: React.MouseEventHandler<HTMLButtonElement>,
            highlighted?: boolean,
            onDelete?: React.MouseEventHandler<HTMLButtonElement>,
            onStartEditing?: React.MouseEventHandler<HTMLButtonElement>,
            onCancelEditing?: React.MouseEventHandler<HTMLButtonElement>,
            disabled?: boolean,
            taskUIStatus: TaskStatus,
            onSubmitChangeName?: React.FormEventHandler<HTMLFormElement>
        }>
) {

    const isEditing = taskUIStatus === 'editing'
    const isDisabled = disabled || taskUIStatus === 'submitting';


    let iconStatus: IconStatus = 'unchecked';
    if (taskUIStatus === 'checked') {
        iconStatus = 'checked';
    } else if (taskUIStatus === 'submitting') {
        iconStatus = 'busy';
    }


    return <div className={clsx(
        "bg-slate-700 rounded-md p-1 flex items-center justify-between gap-2 text-white",
        !disabled && 'hover:opacity-90',
        highlighted && "animate-pulse",

    )}>
        {
            isEditing ? <EditTaskForm originName={name} onCancel={onCancelEditing} onSubmit={onSubmitChangeName} /> : <>
                <div className="flex items-center gap-2 w-full">
                    <TaskIcon status={iconStatus} onClick={onCheck} />
                    <span>{name}</span>
                </div>
                <div className="flex">
                    <Button onClick={onStartEditing} disabled={isDisabled} size="sm" ><PencilSquareIcon height={20} width={20} /></Button>
                    <Button disabled={isDisabled} size="sm" onClick={onDelete} ><TrashIcon height={20} width={20} /></Button>
                </div>
            </>
        }
    </div>
}