import { ArchiveBoxXMarkIcon, CheckIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import TextInput from "./text-input";
import { useEffect, useRef, useState } from "react";

export default function EditTaskForm({
    originName,
    onCancel,
    onSubmit,
}: Readonly<{
    originName: string,
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
}>) {
    const newNameInputRef = useRef<HTMLInputElement>(null);
    const [newName, setNewName] = useState(originName);

    const disableSubmit = newName === originName || newName.length === 0;

    useEffect(() => {
        newNameInputRef.current?.focus();
    }, []);



    return <form className="flex w-full justify-between items-center gap-3" onSubmit={onSubmit}>
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
            <Button onClick={onCancel} className="bg-red-500 text-black" size="sm" ><ArchiveBoxXMarkIcon height={20} width={20} /></Button>
            <Button title={disableSubmit ? 'You have to make some change' : 'Change name'} disabled={disableSubmit} type="submit" className="bg-green-400" size="sm"><CheckIcon height={20} width={20} /></Button>
        </div>
    </form>
}