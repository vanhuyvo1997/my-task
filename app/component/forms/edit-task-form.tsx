import { ArchiveBoxXMarkIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import TextInput from "../commons/text-inputs/text-input";
import PrimaryButton from "../commons/buttons/primary-button";
import { PrioritySelector } from "./add-task-form";
import { TaskData } from "@/app/lib/action/task-actions";

export default function EditTaskForm({
    originName,
    originPriority,
    onCancel,
    onSubmit,
}: Readonly<{
    originName: string,
    originPriority: TaskData['priority']
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
}>) {
    const newNameInputRef = useRef<HTMLInputElement>(null);
    const [newName, setNewName] = useState(originName);
    const [newPriority, setNewPriority] = useState(originPriority);

    const disableSubmit = (newName === originName && newPriority === originPriority) || newName.length === 0;

    useEffect(() => {
        newNameInputRef.current?.focus();
    }, []);



    return <form className="flex w-full justify-between items-center gap-3" onSubmit={onSubmit}>
        <PrioritySelector onSelect={p => setNewPriority(p)} defaultValue={newPriority} />
        <TextInput
            ref={newNameInputRef}
            id="task-name"
            name="task-name"
            title="Task name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onClearText={() => setNewName('')}
            className="bg-transparent w-full text-white shadow-none outline-none border-none pt-0 pb-0"
        />
        <div className="flex justify-between gap-3">
            <PrimaryButton onClick={onCancel} className="bg-red-500 text-black" size="sm" ><ArchiveBoxXMarkIcon height={20} width={20} /></PrimaryButton>
            <PrimaryButton title={disableSubmit ? 'You have to make some change' : 'Change name'} disabled={disableSubmit} type="submit" className="bg-green-400" size="sm"><CheckIcon height={20} width={20} /></PrimaryButton>
        </div>
    </form>
}