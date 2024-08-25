import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import TaskIcon, { IconStatus } from "./task-icon";
import clsx from "clsx";

export default function Task({
    status = "checked",
    name,
    onCheck,
    highlighted,
    onDelete,
}: Readonly<{
    status: 'checked' | 'unchecked' | 'submiting',
    name: string,
    onCheck?: React.MouseEventHandler<HTMLButtonElement>,
    highlighted?: boolean,
    onDelete?: React.MouseEventHandler<HTMLButtonElement>,
}>) {
    const isDisabled = status === 'submiting';
    let iconStatus: IconStatus;
    if (status === 'checked') {
        iconStatus = 'checked';
    } else if (status === 'unchecked') {
        iconStatus = 'unchecked';
    } else {
        iconStatus = 'busy';
    }


    return <div className={clsx(
        "bg-slate-700 rounded-md p-1 flex items-center justify-between gap-2 text-white",
        !isDisabled && 'hover:opacity-90',
        highlighted && "animate-pulse",
    )}>
        <div className="flex items-center gap-2">
            <TaskIcon status={iconStatus} onClick={onCheck} />
            <span>{name}</span>
        </div>
        <div className="">
            <Button disabled={isDisabled} size="sm" ><PencilSquareIcon height={20} width={20} /></Button>
            <Button disabled={isDisabled} size="sm" onClick={onDelete} ><TrashIcon height={20} width={20} /></Button>
        </div>
    </div>
}